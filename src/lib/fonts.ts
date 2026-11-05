import localFont from "next/font/local";

// Fonts are bundled from @fontsource packages so the build never depends on a
// third-party font CDN, which also keeps first paint fast on slow connections.

export const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

export const serifEn = localFont({
  src: "../../node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-wght-normal.woff2",
  variable: "--font-serif-en",
  weight: "200 900",
  display: "swap",
});

export const bangla = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/noto-sans-bengali/files/noto-sans-bengali-bengali-400-normal.woff2",
      weight: "400",
    },
    {
      path: "../../node_modules/@fontsource/noto-sans-bengali/files/noto-sans-bengali-bengali-500-normal.woff2",
      weight: "500",
    },
    {
      path: "../../node_modules/@fontsource/noto-sans-bengali/files/noto-sans-bengali-bengali-600-normal.woff2",
      weight: "600",
    },
    {
      path: "../../node_modules/@fontsource/noto-sans-bengali/files/noto-sans-bengali-bengali-700-normal.woff2",
      weight: "700",
    },
  ],
  variable: "--font-bangla",
  display: "swap",
  preload: true,
});

export const banglaSerif = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/noto-serif-bengali/files/noto-serif-bengali-bengali-600-normal.woff2",
      weight: "600",
    },
    {
      path: "../../node_modules/@fontsource/noto-serif-bengali/files/noto-serif-bengali-bengali-700-normal.woff2",
      weight: "700",
    },
  ],
  variable: "--font-bangla-serif",
  display: "swap",
  preload: false,
});
