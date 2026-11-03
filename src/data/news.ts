import type { NewsArticle, NewsCategory } from "@/types";
import { images } from "./images";

export const newsCategories: Record<NewsCategory, string> = {
  event: "Event",
  achievement: "Achievement",
  academic: "Academic",
  campus: "Campus",
  culture: "Culture",
  sports: "Sports",
};

export const news: NewsArticle[] = [
  {
    slug: "science-fair-2026",
    title: "Inter-class Science Fair brings 42 student projects to the campus",
    category: "academic",
    date: "2026-10-30",
    eventDate: "2026-10-29",
    venue: "Main Hall & Science Building",
    featured: true,
    excerpt:
      "From a rainwater filter for rural homes to a low-cost soil moisture alarm, students from Class 6 to 12 presented projects built around everyday problems in Sylhet.",
    body: [
      "The annual inter-class science fair was held on 29 October in the main hall and the science building. Forty-two teams from Class 6 to Class 12 displayed working models and posters.",
      "Projects focused on practical local problems. A Class 9 team built a sand-and-charcoal rainwater filter designed for homes without a tube-well, while a group from the HSC science section demonstrated a soil moisture alarm for tea garden nurseries using a microcontroller.",
      "Judges from the science and ICT departments assessed each project on originality, method and how clearly students explained their work. Guardians and students from nearby schools visited the fair in the afternoon.",
      "The principal thanked the science teachers for supervising the teams and announced that selected projects will be displayed again during the annual prize-giving ceremony.",
    ],
    image: images.scienceFair,
  },
  {
    slug: "annual-sports-2026-dates",
    title: "Annual Sports Day 2027 scheduled for January",
    category: "sports",
    date: "2026-10-18",
    eventDate: "2027-01-14",
    venue: "School playground",
    excerpt:
      "Heats for sprint, long jump and relay events will begin after the annual examinations. House captains will collect entry forms in December.",
    body: [
      "The annual sports day will be held on 14 January 2027 on the school playground. Heats for track events will take place during the first week of January.",
      "Students will compete for their houses — Padma, Meghna, Jamuna and Surma — in athletics, relay, sack race, and a guardians' musical chairs event.",
      "House captains will distribute entry forms in December. Students with medical concerns should inform their class teacher before registering.",
    ],
    image: images.sports,
  },
  {
    slug: "debate-championship-2026",
    title: "Students reach the final of the district-level debate competition",
    category: "achievement",
    date: "2026-09-26",
    eventDate: "2026-09-24",
    venue: "Sylhet district auditorium",
    excerpt:
      "A three-member team from the higher secondary section argued for the motion on climate adaptation and reached the final round.",
    body: [
      "A three-member debate team from the higher secondary section reached the final round of a district-level Bangla debate competition held on 24 September.",
      "The team spoke for the motion that local communities should lead climate adaptation planning. Their coach, a teacher from the Bangla department, said the team prepared for six weeks through weekly practice sessions in the library.",
      "This is sample news content for the demonstration website and does not describe a real competition result.",
    ],
    image: images.speaker,
  },
  {
    slug: "new-computer-lab-desks",
    title: "Computer lab upgraded with 30 new student workstations",
    category: "campus",
    date: "2026-08-21",
    excerpt:
      "The upgraded ICT lab now allows a full section to practise together, with a separate session timetable for Class 6 to 8 and HSC students.",
    body: [
      "The ICT lab has been upgraded with 30 new student workstations, allowing an entire section to take part in practical classes together.",
      "A new lab timetable gives Class 6 to 8 two practical periods each week, while SSC and HSC ICT students receive additional supervised practice before examinations.",
      "Students are reminded to follow the lab rules displayed at the entrance and to save their work to their own folders at the end of each session.",
    ],
    image: images.computerLab,
  },
  {
    slug: "pahela-baishakh-2026",
    title: "Pahela Baishakh celebrated with songs, alpana and a campus fair",
    category: "culture",
    date: "2026-04-15",
    eventDate: "2026-04-14",
    venue: "School grounds",
    excerpt:
      "Students welcomed Bangla New Year 1433 with a colourful procession, traditional songs and stalls of handmade crafts.",
    body: [
      "The school celebrated Pahela Baishakh on 14 April with a morning procession around the campus, followed by songs and recitation by students of every section.",
      "The art club decorated the entrance with alpana, and students from Class 8 to 10 ran stalls of handmade crafts and traditional snacks.",
      "The day ended with a short cultural programme in which primary students performed a group dance.",
    ],
    image: images.students,
  },
  {
    slug: "library-reading-week",
    title: "Reading Week encourages students to borrow beyond textbooks",
    category: "academic",
    date: "2026-07-08",
    eventDate: "2026-07-05",
    venue: "Central library",
    excerpt:
      "Each class kept a reading log for a week. Primary students read picture books aloud, while older students reviewed novels and biographies.",
    body: [
      "The central library organised a Reading Week from 5 to 11 July. Each class kept a shared reading log, and students presented short reviews in their Bangla and English periods.",
      "The librarian said that borrowing increased noticeably during the week, especially for Bangla novels and science books written for young readers.",
    ],
    image: images.library,
  },
  {
    slug: "study-tour-srimangal",
    title: "Class 8 study tour visits tea gardens and a research institute",
    category: "event",
    date: "2026-03-12",
    eventDate: "2026-03-10",
    venue: "Sreemangal, Moulvibazar",
    excerpt:
      "Students learned how tea is grown and processed and recorded observations for their science and geography projects.",
    body: [
      "Class 8 students went on a one-day study tour to Sreemangal on 10 March, accompanied by six teachers.",
      "Students observed tea cultivation and processing and recorded notes for their science and geography projects. The tour was organised with written consent from guardians.",
    ],
    image: images.teaGarden,
  },
];

export const sortedNews = [...news].sort((a, b) => b.date.localeCompare(a.date));

export function getArticle(slug: string): NewsArticle | undefined {
  return news.find((n) => n.slug === slug);
}
