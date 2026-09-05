import { createServerFn } from "@tanstack/react-start";

import { ALL_PLACES } from "./places";

export type MapPoint = {
  name: string;
  category: string;
  detail: string;
  distance: string;
  url: string;
  lat: number;
  lng: number;
};

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps";

// Cached per server instance so the fixed place list is geocoded once.
let cached: MapPoint[] | null = null;

export const getMapPoints = createServerFn({ method: "GET" }).handler(
  async (): Promise<MapPoint[]> => {
    if (cached) return cached;

    const lovableKey = process.env["LOVABLE_API_KEY"];
    const mapsKey = process.env["GOOGLE_MAPS_API_KEY"];
    if (!lovableKey || !mapsKey) {
      throw new Error("Missing Google Maps connector credentials");
    }

    const points: MapPoint[] = [];
    for (const place of ALL_PLACES) {
      const response = await fetch(
        `${GATEWAY_URL}/maps/api/geocode/json?address=${encodeURIComponent(place.query)}&region=hr`,
        {
          headers: {
            Authorization: `Bearer ${lovableKey}`,
            "X-Connection-Api-Key": mapsKey,
          },
        },
      );

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Geocode failed [${response.status}]: ${errorBody}`);
        throw new Error(
          `Google Maps request failed [${response.status}]: ${errorBody}`,
        );
      }

      const data = (await response.json()) as {
        status: string;
        results?: Array<{ geometry: { location: { lat: number; lng: number } } }>;
      };
      const loc = data.results?.[0]?.geometry.location;
      if (!loc) {
        console.error(`No geocode result for "${place.query}" (${data.status})`);
        continue;
      }

      points.push({
        name: place.name,
        category: place.category,
        detail: place.detail,
        distance: place.distance,
        url: place.url,
        lat: loc.lat,
        lng: loc.lng,
      });
    }

    cached = points;
    return points;
  },
);
