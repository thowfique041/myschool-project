import type { Metadata, Viewport } from "next";
import { Document } from "@/components/layout/Document";
import { ToastProvider } from "@/components/admin/ui";

export const metadata: Metadata = {
  title: { default: "Admin (demo)", template: "%s · Admin" },
  robots: { index: false, follow: false },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#0a1526", colorScheme: "light dark" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Document lang="en">
      <ToastProvider>{children}</ToastProvider>
    </Document>
  );
}
