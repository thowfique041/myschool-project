import { Hero } from "@/components/home/Hero";
import {
  FaqContactSection,
  GalleryPreview,
  LevelsSection,
  NewsSection,
  NoticesAdmissionSection,
  PeopleSection,
  ResultsSection,
  WelcomeSection,
  WhyFacilitiesSection,
} from "@/components/home/sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WelcomeSection />
      <LevelsSection />
      <NoticesAdmissionSection />
      <WhyFacilitiesSection />
      <ResultsSection />
      <NewsSection />
      <GalleryPreview />
      <PeopleSection />
      <FaqContactSection />
    </>
  );
}
