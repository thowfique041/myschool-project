import localFont from "next/font/local";

// Hind Siliguri (the Google Fonts family) for both English and Bangla, bundled from
// @fontsource so the build does not depend on a font CDN. The Latin and Bengali subsets are
// separate files, so they are loaded as two faces and stacked in --font-sans (globals.css).

export const hind = localFont({
  src: [
    { path: "../../node_modules/@fontsource/hind-siliguri/files/hind-siliguri-latin-400-normal.woff2", weight: "400" },
    { path: "../../node_modules/@fontsource/hind-siliguri/files/hind-siliguri-latin-500-normal.woff2", weight: "500" },
    { path: "../../node_modules/@fontsource/hind-siliguri/files/hind-siliguri-latin-600-normal.woff2", weight: "600" },
    { path: "../../node_modules/@fontsource/hind-siliguri/files/hind-siliguri-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-hind",
  display: "swap",
});

export const hindBn = localFont({
  src: [
    { path: "../../node_modules/@fontsource/hind-siliguri/files/hind-siliguri-bengali-400-normal.woff2", weight: "400" },
    { path: "../../node_modules/@fontsource/hind-siliguri/files/hind-siliguri-bengali-500-normal.woff2", weight: "500" },
    { path: "../../node_modules/@fontsource/hind-siliguri/files/hind-siliguri-bengali-600-normal.woff2", weight: "600" },
    { path: "../../node_modules/@fontsource/hind-siliguri/files/hind-siliguri-bengali-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-hind-bn",
  display: "swap",
});
