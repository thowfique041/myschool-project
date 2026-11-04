import localFont from "next/font/local";

// Hind Siliguri covers both Latin and Bangla, so one family carries the whole
// site. The Latin and Bangla subsets are separate files, loaded as two
// families and stacked so each script picks up its own glyphs.
// Fonts are bundled from @fontsource so the build never depends on a font CDN.

export const inter = localFont({
  src: [
    { path: "../../node_modules/@fontsource/hind-siliguri/files/hind-siliguri-latin-400-normal.woff2", weight: "400" },
    { path: "../../node_modules/@fontsource/hind-siliguri/files/hind-siliguri-latin-500-normal.woff2", weight: "500" },
    { path: "../../node_modules/@fontsource/hind-siliguri/files/hind-siliguri-latin-600-normal.woff2", weight: "600" },
    { path: "../../node_modules/@fontsource/hind-siliguri/files/hind-siliguri-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-inter",
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

/* Headings use the same family; these stay exported so the layout keeps working. */
export const serifEn = inter;
export const banglaSerif = bangla;
