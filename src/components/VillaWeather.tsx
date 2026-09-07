import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

import { getForecast, type ForecastDay } from "@/lib/weather.functions";

function describe(code: number): string {
  if (code === 0) return "Clear sky";
  if (code <= 2) return "Mostly sunny";
  if (code === 3) return "Cloudy";
  if (code <= 48) return "Fog";
  if (code <= 57) return "Drizzle";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Showers";
  if (code <= 86) return "Snow showers";
  return "Thunderstorm";
}

function Glyph({ code }: { code: number }) {
  const stroke = "currentColor";
  if (code === 0 || code <= 2) {
    return (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.3">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" strokeLinecap="round" />
      </svg>
    );
  }
  if (code === 3 || code <= 48) {
    return (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.3">
        <path d="M7 18h10a4 4 0 0 0 0-8 6 6 0 0 0-11.6 2A3.5 3.5 0 0 0 7 18Z" strokeLinejoin="round" />
      </svg>
    );
  }
  if (code >= 95) {
    return (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.3">
        <path d="M7 15h10a4 4 0 0 0 0-8 6 6 0 0 0-11.6 2A3.5 3.5 0 0 0 7 15Z" strokeLinejoin="round" />
        <path d="M13 17l-3 5h4l-2 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.3">
      <path d="M7 15h10a4 4 0 0 0 0-8 6 6 0 0 0-11.6 2A3.5 3.5 0 0 0 7 15Z" strokeLinejoin="round" />
      <path d="M9 18l-1 3M13 18l-1 3M17 18l-1 3" strokeLinecap="round" />
    </svg>
  );
}

function dayLabel(date: string, index: number): string {
  if (index === 0) return "Today";
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", {
    weekday: "short",
  });
}

export default function VillaWeather() {
  const fetchForecast = useServerFn(getForecast);
  const { data, isError } = useQuery<ForecastDay[]>({
    queryKey: ["forecast"],
    queryFn: () => fetchForecast(),
    staleTime: 30 * 60 * 1000,
  });

  if (isError) {
    return (
      <p className="font-body text-sm text-ink/60">
        The forecast is unavailable right now.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {(data ?? Array.from({ length: 3 })).map((day, i) => {
        const d = day as ForecastDay | undefined;
        return (
          <div
            key={d?.date ?? i}
            className="flex flex-col items-center gap-2 rounded-[min(1.5vw,14px)] border border-clay/30 px-3 py-5 text-center"
          >
            <span className="font-body text-xs uppercase tracking-[0.2em] text-clay">
              {d ? dayLabel(d.date, i) : "—"}
            </span>
            <span className="text-terra">{d ? <Glyph code={d.code} /> : <span className="block size-6" />}</span>
            <span className="font-body text-base font-medium text-ink">
              {d ? `${d.max}°` : "–"}
              <span className="ml-1 text-ink/50">{d ? `${d.min}°` : ""}</span>
            </span>
            <span className="font-body text-xs leading-relaxed text-ink/60">
              {d ? describe(d.code) : ""}
            </span>
          </div>
        );
      })}
    </div>
  );
}
