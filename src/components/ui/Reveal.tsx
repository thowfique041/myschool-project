"use client";


import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** distance in px the element travels upward while fading in */
  y?: number;
  as?: "div" | "section" | "li" | "article";
};

/** Fades a block in once as it scrolls into view. Static when reduced motion is preferred. */
export function Reveal({ children, className, as = "div" }: RevealProps) {
  // Content simply appears; scroll-in animations were removed on purpose.
  const Static = as;
  return <Static className={className}>{children}</Static>;
}
