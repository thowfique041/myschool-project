import type { ImageAsset } from "@/types";

/**
 * Central image registry. The current assets are original illustrations made
 * for this project (no real campus is depicted). To use licensed photographs
 * later, drop them in /public/images and update the entries here — every
 * component reads images from this file.
 */
const make = (file: string, alt: string): ImageAsset => ({
  src: `/images/${file}`,
  alt,
  width: 1600,
  height: 1000,
});

export const images = {
  campus: make(
    "campus.svg",
    "Illustration of a four-storey school building with green veranda railings, the national flag, a Shaheed Minar and students walking to class",
  ),
  classroom: make(
    "classroom.svg",
    "Illustration of a classroom where a teacher in a sari explains a lesson at the chalkboard to students on wooden benches",
  ),
  scienceLab: make(
    "science-lab.svg",
    "Illustration of students in lab coats doing an experiment with a teacher in the science laboratory",
  ),
  computerLab: make(
    "computer-lab.svg",
    "Illustration of an ICT teacher guiding students working on desktop computers",
  ),
  library: make(
    "library.svg",
    "Illustration of students reading at a long table in front of full library bookshelves",
  ),
  sports: make("sports.svg", "Illustration of students playing cricket on the school field"),
  football: make("football.svg", "Illustration of students playing football on the school ground"),
  assembly: make(
    "assembly.svg",
    "Illustration of the morning assembly with students in lines facing the flag and teachers on the platform",
  ),
  cultural: make(
    "cultural.svg",
    "Illustration of students performing a dance on a decorated stage with marigold garlands and alpana",
  ),
  teacherStudent: make(
    "teacher-student.svg",
    "Illustration of a teacher helping a student at a desk in front of the chalkboard",
  ),
  prizeGiving: make(
    "prize-giving.svg",
    "Illustration of students on a prize podium with a trophy and confetti",
  ),
  examHall: make(
    "exam-hall.svg",
    "Illustration of students writing an examination while an invigilator supervises",
  ),
  admission: make(
    "admission.svg",
    "Illustration of a guardian and a student at the admission desk in the school office",
  ),
  scienceFair: make(
    "science-fair.svg",
    "Illustration of students presenting projects at a science fair",
  ),
  victoryDay: make(
    "victory-day.svg",
    "Illustration of students paying tribute with flowers at the Shaheed Minar",
  ),
  debate: make(
    "debate.svg",
    "Illustration of a debate competition with two student speakers at lecterns and an audience",
  ),
  artClass: make(
    "art-class.svg",
    "Illustration of students painting during an art class with landscape paintings on the wall",
  ),
  studyTour: make(
    "study-tour.svg",
    "Illustration of students and a teacher beside a school bus on a study tour",
  ),
} satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof images;
