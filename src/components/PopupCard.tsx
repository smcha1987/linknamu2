"use client";

import { useState } from "react";
import type { LinkItem } from "@/data/profile";
import { ClickCount, cardClassName } from "./LinkCard";
import Modal from "./Modal";
import PopupBody from "./PopupBody";

export default function PopupCard({
  link,
  count,
  onClick,
}: {
  link: Extract<LinkItem, { kind: "popup" }>;
  count: number;
  onClick: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => {
          onClick();
          setOpen(true);
        }}
        className={`${cardClassName} cursor-pointer`}
      >
        {link.title}
        <ClickCount count={count} />
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title={link.popup.title}>
        <PopupBody content={link.popup} />
      </Modal>
    </>
  );
}
