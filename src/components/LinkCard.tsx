"use client";

import type { LinkItem } from "@/data/profile";

// 제목은 가운데 정렬을 유지하고, 클릭 수는 오른쪽에 겹쳐 놓기 위해 relative + 좌우 여백 확보
export const cardClassName =
  "relative block w-full rounded-2xl border border-white/60 bg-white/45 px-16 py-4 text-center text-[15px] font-medium shadow-[0_6px_24px_-12px_rgba(120,70,40,0.3)] backdrop-blur-md transition duration-200 hover:-translate-y-px hover:bg-white/60 hover:shadow-[0_10px_28px_-12px_rgba(120,70,40,0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-white/10 dark:bg-white/[0.06] dark:hover:bg-white/10";

export function ClickCount({ count }: { count: number }) {
  return (
    <span className="absolute top-1/2 right-5 -translate-y-1/2 text-xs font-normal tabular-nums text-muted">
      {count.toLocaleString("ko-KR")}회
    </span>
  );
}

export default function LinkCard({
  link,
  count,
  onClick,
}: {
  link: Extract<LinkItem, { kind: "link" }>;
  count: number;
  onClick: () => void;
}) {
  // mailto: 등은 새 탭이 아니라 현재 창에서 처리
  const external = /^https?:\/\//.test(link.url);
  return (
    <a
      href={link.url}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      onClick={onClick}
      className={cardClassName}
    >
      {link.title}
      <ClickCount count={count} />
    </a>
  );
}
