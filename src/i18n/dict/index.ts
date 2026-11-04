import { en, type Dictionary } from "./en";
import { bn } from "./bn";

export type { Dictionary };
export const dictionaries: Record<"en" | "bn", Dictionary> = { en, bn };
