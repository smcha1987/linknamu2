import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      <Image
        src={profile.image}
        alt={`${profile.name} 프로필 사진`}
        width={144}
        height={144}
        priority
        className="h-28 w-28 rounded-full object-cover shadow-[0_14px_32px_-14px_rgba(120,70,40,0.5)] ring-4 ring-white/70 sm:h-32 sm:w-32 dark:ring-white/10"
      />
      <h1 className="mt-6 text-2xl font-semibold tracking-tight">{profile.name}</h1>
      <p className="mt-2 max-w-xs break-keep text-[15px] leading-relaxed text-muted">
        {profile.bio}
      </p>
    </header>
  );
}
