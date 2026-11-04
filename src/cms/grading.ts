/** Bangladesh SSC/HSC grading: letter grade and grade point from marks. */
export function gradeFor(marks: number): { grade: string; point: number } {
  if (marks >= 80) return { grade: "A+", point: 5 };
  if (marks >= 70) return { grade: "A", point: 4 };
  if (marks >= 60) return { grade: "A-", point: 3.5 };
  if (marks >= 50) return { grade: "B", point: 3 };
  if (marks >= 40) return { grade: "C", point: 2 };
  if (marks >= 33) return { grade: "D", point: 1 };
  return { grade: "F", point: 0 };
}

export function gpaFor(marks: number[]): number {
  if (!marks.length) return 0;
  const points = marks.map((m) => gradeFor(m).point);
  if (points.includes(0)) return 0;
  return Math.min(5, Math.round((points.reduce((a, b) => a + b, 0) / points.length) * 100) / 100);
}
