import type { GalleryCategory, GalleryItem } from "@/types";
import { images } from "./images";

export const galleryCategories: Record<GalleryCategory, string> = {
  campus: "Campus",
  classroom: "Classroom",
  sports: "Sports",
  cultural: "Cultural Programs",
  events: "Events",
};

export const gallery: GalleryItem[] = [
  { id: "g01", category: "campus", caption: "Main academic building and the Shaheed Minar", captionBn: "প্রধান একাডেমিক ভবন ও শহীদ মিনার", image: images.campus },
  { id: "g02", category: "events", caption: "Morning assembly and national anthem", captionBn: "প্রভাতি সমাবেশ ও জাতীয় সংগীত", image: images.assembly },
  { id: "g03", category: "classroom", caption: "A Bangla lesson in Class 7", captionBn: "সপ্তম শ্রেণির বাংলা ক্লাস", image: images.classroom },
  { id: "g04", category: "classroom", caption: "Chemistry practical in the science lab", captionBn: "বিজ্ঞানাগারে রসায়ন ব্যবহারিক", image: images.scienceLab },
  { id: "g05", category: "classroom", caption: "ICT practical class", captionBn: "আইসিটি ব্যবহারিক ক্লাস", image: images.computerLab },
  { id: "g06", category: "campus", caption: "Reading hour in the central library", captionBn: "কেন্দ্রীয় পাঠাগারে পাঠ ঘণ্টা", image: images.library },
  { id: "g07", category: "sports", caption: "Inter-house cricket match", captionBn: "আন্তঃহাউস ক্রিকেট ম্যাচ", image: images.sports },
  { id: "g08", category: "sports", caption: "Football practice after school", captionBn: "ছুটির পর ফুটবল অনুশীলন", image: images.football },
  { id: "g09", category: "cultural", caption: "Group dance at the Pahela Baishakh programme", captionBn: "পহেলা বৈশাখের অনুষ্ঠানে দলীয় নৃত্য", image: images.cultural },
  { id: "g10", category: "cultural", caption: "Art class preparing for the annual exhibition", captionBn: "বার্ষিক চিত্র প্রদর্শনীর প্রস্তুতি", image: images.artClass },
  { id: "g11", category: "events", caption: "Tribute at the Shaheed Minar on Victory Day", captionBn: "বিজয় দিবসে শহীদ মিনারে শ্রদ্ধা নিবেদন", image: images.victoryDay },
  { id: "g12", category: "events", caption: "Inter-class science fair", captionBn: "আন্তঃশ্রেণি বিজ্ঞান মেলা", image: images.scienceFair },
  { id: "g13", category: "cultural", caption: "Bangla debate competition", captionBn: "বাংলা বিতর্ক প্রতিযোগিতা", image: images.debate },
  { id: "g14", category: "events", caption: "Annual prize-giving ceremony", captionBn: "বার্ষিক পুরস্কার বিতরণী", image: images.prizeGiving },
  { id: "g15", category: "events", caption: "Class 8 study tour", captionBn: "অষ্টম শ্রেণির শিক্ষা সফর", image: images.studyTour },
  { id: "g16", category: "classroom", caption: "One-to-one support during tutorial hour", captionBn: "টিউটোরিয়াল ক্লাসে আলাদা সহায়তা", image: images.teacherStudent },
];
