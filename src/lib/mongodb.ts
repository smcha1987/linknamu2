import { MongoClient, type Db } from "mongodb";

const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");

  // dev 환경 HMR 시 연결이 계속 늘어나지 않도록 globalThis에 캐시
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri)
      .connect()
      .catch((error) => {
        globalForMongo._mongoClientPromise = undefined;
        throw error;
      });
  }
  return globalForMongo._mongoClientPromise;
}

// linknamu-cluster를 기존 linknamu 프로젝트와 공유하므로 linknamu2 DB만 사용
const DB_NAME = "linknamu2";

export async function getDb(): Promise<Db> {
  // 기존 프로젝트의 환경 변수를 그대로 복사한 경우 등 잘못된 설정을 차단
  const configured = process.env.MONGODB_DB;
  if (configured && configured !== DB_NAME) {
    throw new Error(`MONGODB_DB must be "${DB_NAME}" (got "${configured}")`);
  }
  const client = await getClient();
  return client.db(DB_NAME);
}
