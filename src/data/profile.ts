import type { PopupContent } from "./popup";

export type Profile = {
  name: string;
  bio: string;
  image: string;
};

// kind: "link"는 외부 링크로 이동, "popup"은 클릭 시 팝업 표시
export type LinkItem =
  | { id: string; title: string; kind: "link"; url: string }
  | { id: string; title: string; kind: "popup"; popup: PopupContent };

export const profile: Profile = {
  name: "김개발",
  bio: "풀스택 개발자 | 요즘에는 AI 개발에 관심이 많아요",
  image: "/profile.jpg",
};

export const links: LinkItem[] = [
  { id: "github", kind: "link", title: "🐙 깃허브", url: "https://github.com/your-id" },
  { id: "blog", kind: "link", title: "✍️ 블로그", url: "https://your-blog.com" },
  { id: "email", kind: "link", title: "📬 이메일", url: "mailto:you@example.com" },
];

export function isLinkId(id: unknown): id is string {
  return typeof id === "string" && links.some((link) => link.id === id);
}
