/** Thin tea-garden wave: rows of rounded tea bushes on gentle slopes. Homepage only. */
export function TeaWave({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 1200 28" preserveAspectRatio="none" className={`block h-5 w-full text-navy-700 dark:text-navy-300 ${className}`}>
      <path d="M0 20c60-10 120-10 180 0s120 10 180 0 120-10 180 0 120 10 180 0 120-10 180 0 120 10 180 0 60-5 120-2" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.55" />
      <path d="M0 25c80-7 160-7 240 0s160 7 240 0 160-7 240 0 160 7 240 0 160-7 240 0" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      {Array.from({ length: 24 }, (_, i) => {
        const x = 25 + i * 50;
        const y = 20 - 4 * Math.cos((x / 180) * Math.PI);
        return <path key={i} d={`M${x - 9} ${y}c2-6 16-6 18 0`} fill="currentColor" opacity="0.35" />;
      })}
    </svg>
  );
}
