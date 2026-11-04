import { cn } from "@/lib/utils";

export type Gender = "male" | "female";

/**
 * Neutral profile placeholder (like a social-media default picture), shown
 * wherever a person has no photo yet. Separate silhouettes for men and women.
 */
export function DefaultAvatar({ gender = "male", className }: { gender?: Gender; className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden
      className={cn("shrink-0 overflow-hidden rounded-full bg-[#c9ced4] text-[#f4f5f7] dark:bg-[#3a3d42] dark:text-[#7c8088]", className)}
    >
      {gender === "female" ? (
        <g fill="currentColor">
          {/* hair falling to the shoulders */}
          <path d="M50 18c-15 0-24 10.5-24 25.5 0 9 1.2 17.5-3.5 26.5 6.5 2.5 14 3.5 27.5 3.5s21-1 27.5-3.5C72.8 61 74 52.5 74 43.5 74 28.5 65 18 50 18Z" />
          {/* neck and shoulders */}
          <path d="M50 66c-21 0-34 9.5-37 26v8h74v-8c-3-16.5-16-26-37-26Z" />
          {/* face */}
          <ellipse cx="50" cy="44" rx="15" ry="17.5" />
        </g>
      ) : (
        <g fill="currentColor">
          <circle cx="50" cy="39" r="18" />
          <path d="M50 63c-21.5 0-35 10.5-37.5 28V100h75v-9c-2.5-17.5-16-28-37.5-28Z" />
        </g>
      )}
    </svg>
  );
}
