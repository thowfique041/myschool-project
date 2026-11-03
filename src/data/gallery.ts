import type { GalleryCategory, GalleryItem } from "@/types";
import { images } from "./images";

export const galleryCategories: Record<GalleryCategory, string> = {
  campus: "Campus",
  classroom: "Classroom",
  sports: "Sports",
  cultural: "Activities",
  events: "Events",
};

/**
 * Captions describe what each representative photo actually shows. The photos
 * come from Unsplash and are not pictures of Webnion School & College.
 */
export const gallery: GalleryItem[] = [
  { id: "g01", category: "campus", caption: "A college campus with a green lawn", captionBn: "সবুজ মাঠসহ কলেজ ক্যাম্পাস", image: images.campus },
  { id: "g02", category: "events", caption: "Students together on a school day", captionBn: "স্কুলের দিনে একসাথে শিক্ষার্থীরা", image: images.students },
  { id: "g03", category: "classroom", caption: "A full classroom during a lesson", captionBn: "পাঠ চলাকালীন শ্রেণিকক্ষ", image: images.classroom },
  { id: "g04", category: "classroom", caption: "A science experiment with the teacher", captionBn: "শিক্ষকের সাথে বিজ্ঞানের পরীক্ষা", image: images.scienceLab },
  { id: "g05", category: "classroom", caption: "Practical class in the computer lab", captionBn: "কম্পিউটার ল্যাবে ব্যবহারিক ক্লাস", image: images.computerLab },
  { id: "g06", category: "campus", caption: "Shelves of books in a library", captionBn: "পাঠাগারের বইয়ের তাক", image: images.library },
  { id: "g07", category: "sports", caption: "A game of cricket on the field", captionBn: "মাঠে ক্রিকেট খেলা", image: images.sports },
  { id: "g08", category: "sports", caption: "Playing on the open field", captionBn: "খোলা মাঠে খেলাধুলা", image: images.football },
  { id: "g09", category: "classroom", caption: "Young learners in the primary section", captionBn: "প্রাথমিক শাখার খুদে শিক্ষার্থীরা", image: images.primaryClass },
  { id: "g10", category: "cultural", caption: "Working together on a group activity", captionBn: "দলগত কাজে শিক্ষার্থীরা", image: images.groupWork },
  { id: "g11", category: "events", caption: "The national flag of Bangladesh", captionBn: "বাংলাদেশের জাতীয় পতাকা", image: images.flag },
  { id: "g12", category: "events", caption: "Learning by doing at a science session", captionBn: "হাতে-কলমে বিজ্ঞান শিক্ষা", image: images.scienceFair },
  { id: "g13", category: "cultural", caption: "Public speaking practice", captionBn: "বক্তৃতা চর্চা", image: images.speaker },
  { id: "g14", category: "classroom", caption: "A student answering in class", captionBn: "ক্লাসে প্রশ্নের উত্তর দিচ্ছে শিক্ষার্থী", image: images.studentAnswering },
  { id: "g15", category: "events", caption: "Tea gardens — a favourite study tour destination", captionBn: "চা বাগান — শিক্ষা সফরের প্রিয় গন্তব্য", image: images.teaGarden },
  { id: "g16", category: "classroom", caption: "Studying together at the desk", captionBn: "একসাথে পড়াশোনা", image: images.deskStudy },
];
