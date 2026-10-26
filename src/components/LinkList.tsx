"use client";

import { useEffect, useState } from "react";
import type { LinkItem } from "@/data/profile";
import { trackClick } from "@/lib/trackClick";
import LinkCard from "./LinkCard";
import PopupCard from "./PopupCard";

type Counts = Record<string, number>;

export default function LinkList({ links }: { links: LinkItem[] }) {
  // 서버 값을 받기 전에는 0회로 표시
  const [counts, setCounts] = useState<Counts>({});

  useEffect(() => {
    let cancelled = false;
    fetch("/api/click", { cache: "no-store" })
      .then((res) => (res.ok ? (res.json() as Promise<Counts>) : null))
      .then((server) => {
        if (cancelled || !server) return;
        // 응답 전에 누른 클릭(prev)은 서버 값 위에 더해서 유지
        setCounts((prev) => {
          const merged = { ...server };
          for (const [id, n] of Object.entries(prev)) {
            merged[id] = (merged[id] ?? 0) + n;
          }
          return merged;
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  function handleClick(id: string) {
    trackClick(id);
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }

  return (
    <ul className="flex flex-col gap-4">
      {links.map((link) => {
        const count = counts[link.id] ?? 0;
        const onClick = () => handleClick(link.id);
        return (
          <li key={link.id}>
            {link.kind === "popup" ? (
              <PopupCard link={link} count={count} onClick={onClick} />
            ) : (
              <LinkCard link={link} count={count} onClick={onClick} />
            )}
          </li>
        );
      })}
    </ul>
  );
}
