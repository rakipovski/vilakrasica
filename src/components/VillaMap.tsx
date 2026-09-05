import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

import { getMapPoints, type MapPoint } from "@/lib/geocode.functions";

const CATEGORY_COLORS: Record<string, string> = {
  villa: "#8C3B22",
  shops: "#C97B4A",
  restaurants: "#4A6B52",
  beaches: "#3E6E8E",
};

const CATEGORY_LABELS: Record<string, string> = {
  villa: "Villa Krasica",
  shops: "Shops",
  restaurants: "Restaurants",
  beaches: "Beaches",
};

declare global {
  interface Window {
    google?: typeof google;
    __initVillaMap?: () => void;
  }
}

function loadMapsApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.google?.maps) return Promise.resolve();

  const existing = document.getElementById("google-maps-js");
  if (existing) {
    return new Promise((resolve) => {
      const check = window.setInterval(() => {
        if (window.google?.maps) {
          window.clearInterval(check);
          resolve();
        }
      }, 100);
    });
  }

  return new Promise((resolve, reject) => {
    window.__initVillaMap = () => resolve();
    const key = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"];
    const channel = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID"];
    const script = document.createElement("script");
    script.id = "google-maps-js";
    script.async = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&loading=async&callback=__initVillaMap${channel ? `&channel=${channel}` : ""}`;
    script.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(script);
  });
}

function pinIcon(color: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="38" viewBox="0 0 28 38"><path d="M14 0C6.3 0 0 6.2 0 13.9 0 24.3 14 38 14 38s14-13.7 14-24.1C28 6.2 21.7 0 14 0z" fill="${color}"/><circle cx="14" cy="14" r="5" fill="#FBF7F1"/></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export default function VillaMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [apiReady, setApiReady] = useState(false);
  const [apiError, setApiError] = useState(false);
  const fetchPoints = useServerFn(getMapPoints);

  const { data: points, isError } = useQuery<MapPoint[]>({
    queryKey: ["map-points"],
    queryFn: () => fetchPoints({}),
    staleTime: Infinity,
  });

  useEffect(() => {
    let cancelled = false;
    loadMapsApi()
      .then(() => !cancelled && setApiReady(true))
      .catch(() => !cancelled && setApiError(true));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!apiReady || !points?.length || !containerRef.current) return;
    const maps = window.google!.maps;

    const map = new maps.Map(containerRef.current, {
      zoom: 11,
      center: { lat: points[0]!.lat, lng: points[0]!.lng },
      mapTypeControl: false,
      streetViewControl: false,
combineControl: undefined as never,
    } as google.maps.MapOptions);

    const bounds = new maps.LatLngBounds();
    const info = new maps.InfoWindow();

    for (const point of points) {
      const marker = new maps.Marker({
        map,
        position: { lat: point.lat, lng: point.lng },
        title: point.name,
        icon: {
          url: pinIcon(CATEGORY_COLORS[point.category] ?? "#8C3B22"),
          scaledSize: new maps.Size(point.category === "villa" ? 34 : 26, point.category === "villa" ? 46 : 35),
        },
        zIndex: point.category === "villa" ? 100 : 1,
      });
      bounds.extend(marker.getPosition()!);
      marker.addListener("click", () => {
        info.setContent(
          `<div style="font-family:system-ui;max-width:220px"><strong>${point.name}</strong><div style="margin-top:4px;color:#555;font-size:13px">${point.detail}</div>${point.distance ? `<div style="margin-top:4px;color:#8C3B22;font-size:12px;text-transform:uppercase;letter-spacing:.08em">${point.distance}</div>` : ""}<a href="${point.url}" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:6px;font-size:13px;color:#8C3B22">Open in Google Maps</a></div>`,
        );
        info.open({ map, anchor: marker });
      });
    }

    map.fitBounds(bounds, 48);
  }, [apiReady, points]);

  const legend = useMemo(() => Object.entries(CATEGORY_LABELS), []);

  return (
    <div>
      <div className="overflow-hidden rounded-[min(1.5vw,14px)] border border-clay/30">
        {isError || apiError ? (
          <div className="grid h-[420px] place-items-center bg-linen px-6 text-center font-body text-sm text-ink/60">
            The map could not be loaded right now. All places below still link
            straight to Google Maps.
          </div>
        ) : (
          <div
            ref={containerRef}
            role="application"
            aria-label="Map of Villa Krasica and nearby shops, restaurants and beaches"
            className="h-[420px] w-full bg-linen md:h-[520px]"
          />
        )}
      </div>
      <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
        {legend.map(([key, label]) => (
          <li
            key={key}
            className="flex items-center gap-2 font-body text-xs uppercase tracking-[0.2em] text-ink/60"
          >
            <span
              className="size-3 rounded-full"
              style={{ backgroundColor: CATEGORY_COLORS[key] }}
            />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
