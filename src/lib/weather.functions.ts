import { createServerFn } from "@tanstack/react-start";

export type ForecastDay = {
  date: string;
  code: number;
  max: number;
  min: number;
};

const LAT = 45.3113;
const LNG = 14.5523;

export const getForecast = createServerFn({ method: "GET" }).handler(
  async (): Promise<ForecastDay[]> => {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LNG}` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
      `&timezone=Europe%2FZagreb&forecast_days=3`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather request failed [${response.status}]`);
    }

    const data = (await response.json()) as {
      daily?: {
        time: string[];
        weather_code: number[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
      };
    };

    const daily = data.daily;
    if (!daily) throw new Error("Weather response missing daily data");

    return daily.time.map((date, i) => ({
      date,
      code: daily.weather_code[i] ?? 0,
      max: Math.round(daily.temperature_2m_max[i] ?? 0),
      min: Math.round(daily.temperature_2m_min[i] ?? 0),
    }));
  },
);
