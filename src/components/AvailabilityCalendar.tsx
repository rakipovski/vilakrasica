import { useEffect, useState } from "react";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

/** Monday-first index of the 1st day of the month (0 = Monday). */
function firstWeekday(year: number, month: number) {
  return (new Date(year, month, 1).getDay() + 6) % 7;
}

export function AvailabilityCalendar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const today = new Date();
  const [view, setView] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const { year, month } = view;
  const total = daysInMonth(year, month);
  const offset = firstWeekday(year, month);
  const cells: Array<number | null> = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const isToday = (day: number) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const isPast = (day: number) =>
    new Date(year, month, day) <
    new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const shiftMonth = (delta: number) => {
    setView((v) => {
      const d = new Date(v.year, v.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Availability calendar"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-cream p-5 shadow-2xl ring-1 ring-ink/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            aria-label="Previous month"
            className="flex size-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5"
          >
            <svg
              className="size-4"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M12 4l-6 6 6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h2 className="font-display text-lg text-ink">
            {MONTHS[month]} {year}
          </h2>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            aria-label="Next month"
            className="flex size-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5"
          >
            <svg
              className="size-4"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M8 4l6 6-6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((d) => (
            <span
              key={d}
              className="py-1 font-body text-[11px] font-medium uppercase tracking-wide text-ink/50"
            >
              {d}
            </span>
          ))}
          {cells.map((day, i) =>
            day === null ? (
              <span key={`e-${i}`} />
            ) : (
              <span
                key={day}
                className={`flex aspect-square items-center justify-center rounded-full font-body text-sm ${
                  isToday(day)
                    ? "bg-terra font-semibold text-cream"
                    : isPast(day)
                      ? "text-ink/30"
                      : "text-ink"
                }`}
              >
                {day}
              </span>
            ),
          )}
        </div>

        <p className="mt-4 text-center font-body text-xs leading-relaxed text-ink/60">
          For live availability and prices, send us a message — we reply
          quickly with free dates.
        </p>
        <a
          href="https://wa.me/385917307118?text=Hi%2C%20I%27m%20interested%20in%20Villa%20Krasica%20availability."
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block rounded-full bg-terra px-5 py-2.5 text-center font-body text-sm font-medium text-cream transition-colors hover:bg-terra/90"
        >
          Ask about your dates
        </a>
        <button
          type="button"
          onClick={onClose}
          className="mt-2 block w-full rounded-full px-5 py-2 text-center font-body text-sm text-ink/60 transition-colors hover:text-ink"
        >
          Close
        </button>
      </div>
    </div>
  );
}
