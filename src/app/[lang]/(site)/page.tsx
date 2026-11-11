import { HomeView } from "@/components/home/HomeView";
import type { HomeContent } from "@/components/home/types";
import { getSetting } from "@/content/site-content";

export default async function HomePage() {
  const home = await getSetting<HomeContent>("homepage");
  return <HomeView home={home} />;
}
