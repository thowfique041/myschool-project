/** Colour accents for teacher cards: card border + avatar ring (light / dark). */
export const TEACHER_TONES = [
  { card: "border-t-navy-800 dark:border-t-navy-300", ring: "ring-line-strong", text: "text-leaf-600 dark:text-accent" },
  { card: "border-blue-500 dark:border-blue-400", ring: "ring-blue-500 dark:ring-blue-400", text: "text-blue-700 dark:text-blue-300" },
  { card: "border-emerald-500 dark:border-emerald-400", ring: "ring-emerald-500 dark:ring-emerald-400", text: "text-emerald-700 dark:text-emerald-300" },
  { card: "border-amber-500 dark:border-amber-400", ring: "ring-amber-500 dark:ring-amber-400", text: "text-amber-700 dark:text-amber-300" },
  { card: "border-rose-500 dark:border-rose-400", ring: "ring-rose-500 dark:ring-rose-400", text: "text-rose-700 dark:text-rose-300" },
  { card: "border-violet-500 dark:border-violet-400", ring: "ring-violet-500 dark:ring-violet-400", text: "text-violet-700 dark:text-violet-300" },
  { card: "border-cyan-500 dark:border-cyan-400", ring: "ring-cyan-500 dark:ring-cyan-400", text: "text-cyan-700 dark:text-cyan-300" },
  { card: "border-orange-500 dark:border-orange-400", ring: "ring-orange-500 dark:ring-orange-400", text: "text-orange-700 dark:text-orange-300" },
  { card: "border-fuchsia-500 dark:border-fuchsia-400", ring: "ring-fuchsia-500 dark:ring-fuchsia-400", text: "text-fuchsia-700 dark:text-fuchsia-300" },
] as const;
export type TeacherTone = (typeof TEACHER_TONES)[number];
