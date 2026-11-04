import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How the Webnion School & College demonstration website handles information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      titleBn="গোপনীয়তা নীতি"
      updated="1 November 2026"
      intro="This is a demonstration website for a fictional institution. It has no backend, so nothing you type into its forms is sent or stored."
      sections={[
        {
          heading: "What this website collects",
          body: [
            "The contact form, admission form and result search run entirely in your browser. When you submit them, the website only shows a confirmation on screen; no data leaves your device.",
            "The website does not use analytics, advertising trackers or cookies of its own.",
          ],
        },
        {
          heading: "If this were a live school website",
          body: [
            "A real institution would explain which details it collects through forms (for example the student's name, date of birth and a guardian's phone number), why it needs them, how long it keeps them, and who can see them.",
            "It would also explain how guardians can ask for their information to be corrected or deleted.",
          ],
        },
        {
          heading: "Links to other websites",
          body: ["Social media links open the platforms' home pages. Those services have their own privacy policies."],
        },
        {
          heading: "Contact",
          body: ["Questions about this demonstration can be sent through the contact page. The address uses the reserved .example domain and is not monitored."],
        },
      ]}
    />
  );
}
