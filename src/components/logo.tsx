import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8", className)} aria-hidden>
      <rect width="32" height="32" rx="8" fill="currentColor" className="text-accent" />
      <path
        d="M8 22 V12 M16 22 V8 M24 22 V14"
        stroke="#f4f9fd"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="8" cy="12" r="1.6" fill="#f4f9fd" />
      <circle cx="16" cy="8" r="1.6" fill="#f4f9fd" />
      <circle cx="24" cy="14" r="1.6" fill="#f4f9fd" />
      <path d="M8 12 L16 8 L24 14" stroke="#f4f9fd" strokeWidth="1.2" fill="none" opacity="0.7" />
    </svg>
  );
}
