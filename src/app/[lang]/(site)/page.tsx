import { HomeView, loadHomeData } from "@/components/home/HomeView";
import type { HomeContent } from "@/components/home/types";
import { getSetting } from "@/content/site-content";

export default async function HomePage() {
  const [home, data] = await Promise.all([getSetting<HomeContent>("homepage"), loadHomeData()]);
  return <HomeView home={home} data={data} />;
}
