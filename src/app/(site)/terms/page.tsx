import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for the Webnion School & College demonstration website.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      titleBn="ব্যবহারের শর্তাবলি"
      updated="1 November 2026"
      intro="Webnion School & College is fictional. This website is a frontend portfolio and client-presentation project."
      sections={[
        {
          heading: "Sample content",
          body: [
            "All names, notices, results, fees, dates, contact details and statistics are illustrative. They do not describe any real school, person or examination result.",
            "Do not rely on this website for admission, examination or fee decisions.",
          ],
        },
        {
          heading: "Images and documents",
          body: [
            "Photographs are free images from Unsplash used under the Unsplash License. They are representative and do not show Webnion School & College. Photographers are listed on the Photo Credits page.",
            "Downloadable PDFs are short placeholder documents marked as samples.",
          ],
        },
        {
          heading: "Forms",
          body: ["Forms validate input and show confirmation messages in the browser only. They do not submit to a school server and do not create any application or record."],
        },
      ]}
    />
  );
}
