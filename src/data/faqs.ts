import type { FaqItem, Testimonial } from "@/types";

export const faqs: FaqItem[] = [
  { topic: "admission", question: "When does admission for 2027 start?", answer: "Admission forms are available from 10 November 2026 and must be submitted by 3 December 2026. See the Admission page for the full schedule." },
  { topic: "admission", question: "How are students selected for Play to Class 1?", answer: "Selection for Play, Nursery and Class 1 is made by lottery among eligible applicants, followed by a short, friendly interview with the guardian. There is no written test for young children." },
  { topic: "admission", question: "Is there an admission test for Class 2 to Class 9?", answer: "Yes. Applicants sit a written test in Bangla, English and Mathematics. Class 6 applicants also answer general knowledge questions. The syllabus follows the previous class's textbooks." },
  { topic: "admission", question: "How do I get admission to Class 11 (HSC)?", answer: "Class 11 admission follows the national online admission process announced by the education boards. The school publishes its group-wise seats and minimum GPA in the HSC circular." },
  { topic: "academic", question: "Which curriculum does the school follow?", answer: "The school follows the national curriculum and textbooks prescribed by the National Curriculum and Textbook Board (NCTB) for every class." },
  { topic: "academic", question: "Are there morning and day shifts?", answer: "The primary section runs in the morning shift. Class 6 to 10 have separate morning and day shifts. Higher secondary classes run from 9:00 AM." },
  { topic: "fees", question: "Can tuition fees be paid monthly?", answer: "Yes, tuition is paid monthly by the 10th of each month at the school office." },
  { topic: "fees", question: "Are there scholarships or fee waivers?", answer: "Students with strong results or financial need can apply for a partial fee waiver through the office. Applications are reviewed by the managing committee each January." },
  { topic: "results", question: "How can I see my child's result?", answer: "Progress reports are given by the class teacher after each term. Results can also be checked by roll number through the result search on this website." },
  { topic: "general", question: "Does the school provide transport?", answer: "The school does not run its own buses. The office can share contact details of registered transport providers used by guardians." },
  { topic: "general", question: "What should I do if my child will be absent?", answer: "Send a written leave application signed by a guardian to the class teacher. For long absences, inform the office in advance." },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "আমার মেয়ে প্রথম শ্রেণি থেকে এখানে পড়ছে। শ্রেণি শিক্ষক নিয়মিত খোঁজ নেন, কোনো সমস্যা হলে ফোন করে জানান — এটা আমাদের কাছে সবচেয়ে বড় ভরসা।",
    name: "A guardian",
    role: "Guardian of a Class 5 student",
  },
  {
    quote:
      "The science teachers let us actually do the practicals instead of only reading about them. Building our project for the science fair was the best part of Class 9.",
    name: "A student",
    role: "Class 10, Science group",
  },
  {
    quote:
      "HSC-তে টিউটোরিয়াল ক্লাসগুলো খুব কাজে এসেছে। স্যারদের কাছে ক্লাসের পরেও প্রশ্ন নিয়ে যাওয়া যেত।",
    name: "A former student",
    role: "HSC 2025, Business Studies",
  },
];
