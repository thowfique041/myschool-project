"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useI18n } from "@/i18n/client";
import { localizePath } from "@/i18n/config";

/** next/link that keeps visitors in their chosen language. */
export default function Link({ href, ...props }: ComponentProps<typeof NextLink>) {
  const { lang } = useI18n();
  const target = typeof href === "string" ? localizePath(href, lang) : href;
  return <NextLink href={target} {...props} />;
}
