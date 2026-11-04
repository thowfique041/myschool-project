import type { Metadata } from "next";
import { DemoLogin } from "@/components/admin/views";

export const metadata: Metadata = { title: "Sign in" };

export default function AdminLoginPage() {
  return <DemoLogin />;
}
