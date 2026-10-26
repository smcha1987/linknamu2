"use client";

import type { LinkItem } from "@/data/profile";
import { trackClick } from "@/lib/trackClick";

export const cardClassName =
  "block w-full rounded-2xl border border-white/60 bg-white/45 px-6 py-4 text-center text-[15px] font-medium shadow-[0_6px_24px_-12px_rgba(120,70,40,0.3)] backdrop-blur-md transition duration-200 hover:-translate-y-px hover:bg-white/60 hover:shadow-[0_10px_28px_-12px_rgba(120,70,40,0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-white/10 dark:bg-white/[0.06] dark:hover:bg-white/10";

export default function LinkCard({
  link,
}: {
  link: Extract<LinkItem, { kind: "link" }>;
}) {
  // mailto: 등은 새 탭이 아니라 현재 창에서 처리
  const external = /^https?:\/\//.test(link.url);
  return (
    <a
      href={link.url}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      onClick={() => trackClick(link.id)}
      className={cardClassName}
    >
      {link.title}
    </a>
  );
}
