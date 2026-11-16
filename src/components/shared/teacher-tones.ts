/** Colour accents for teacher cards: card border + avatar ring (light / dark). Site palette only. */
export const TEACHER_TONES = [
  { card: "border-t-forest-800 dark:border-t-forest-300", ring: "ring-line-strong", text: "text-accent" },
  { card: "border-crimson-600", ring: "ring-crimson-600", text: "text-accent" },
  { card: "border-forest-500 dark:border-forest-400", ring: "ring-forest-500 dark:ring-forest-400", text: "text-subheading" },
] as const;

export type TeacherTone = (typeof TEACHER_TONES)[number];
