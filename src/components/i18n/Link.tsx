"use client";

import NextLink from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { useI18n } from "@/i18n/client";
import { localizePath } from "@/i18n/config";
import { requestScrollTop } from "@/components/layout/ScrollTopOnNav";

/**
 * next/link that keeps visitors in their chosen language and always lands at
 * the top of the page: a link to the page you're already on scrolls back up,
 * and a link to another page opens at its very top (anchor links are left alone).
 */
export default function Link({ href, onClick, ...props }: ComponentProps<typeof NextLink>) {
  const { lang } = useI18n();
  const target = typeof href === "string" ? localizePath(href, lang) : href;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (typeof target !== "string" || target.includes("#") || props.target === "_blank") return;
    const path = target.split("?")[0];
    if (path === window.location.pathname) window.scrollTo({ top: 0, behavior: "smooth" });
    else requestScrollTop();
  };

  return <NextLink href={target} onClick={handleClick} {...props} />;
}
