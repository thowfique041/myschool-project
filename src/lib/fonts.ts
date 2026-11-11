import localFont from "next/font/local";

// Bundled from @fontsource so the build does not depend on a font CDN.
// Bangla first: Noto Serif Bengali for headings, Hind Siliguri for text.
// English pages use one plain sans-serif (Source Sans 3) for headings and text.

export const sansEn = localFont({
  src: "../../node_modules/@fontsource-variable/source-sans-3/files/source-sans-3-latin-wght-normal.woff2",
  variable: "--font-sans-en",
  weight: "200 900",
  display: "swap",
});

export const bangla = localFont({
  src: [
    { path: "../../node_modules/@fontsource/hind-siliguri/files/hind-siliguri-bengali-400-normal.woff2", weight: "400" },
    { path: "../../node_modules/@fontsource/hind-siliguri/files/hind-siliguri-bengali-500-normal.woff2", weight: "500" },
    { path: "../../node_modules/@fontsource/hind-siliguri/files/hind-siliguri-bengali-600-normal.woff2", weight: "600" },
    { path: "../../node_modules/@fontsource/hind-siliguri/files/hind-siliguri-bengali-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-bangla",
  display: "swap",
  preload: true,
});

export const banglaSerif = localFont({
  src: [
    { path: "../../node_modules/@fontsource/noto-serif-bengali/files/noto-serif-bengali-bengali-600-normal.woff2", weight: "600" },
    { path: "../../node_modules/@fontsource/noto-serif-bengali/files/noto-serif-bengali-bengali-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-bangla-serif",
  display: "swap",
  preload: true,
});
