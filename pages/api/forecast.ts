import type { NextApiRequest, NextApiResponse } from "next";
import { ForecastData, ForecastPeriod, PointData } from "../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ForecastPeriod[]>
) {
  const { lat, lon } = req.query;
  const init: RequestInit = {
    method: "GET",
    headers: {
      "User-Agent": "(mformant.com, brandon@mformant.com)",
    },
  };

  const pointsUrl = `https://api.weather.gov/points/${lat},${lon}`;
  const pointsResponse = await fetch(pointsUrl, init);
  const points = (await pointsResponse.json()) as PointData;

  const forecastUrl = points.properties.forecast;
  const forecastResponse = await fetch(forecastUrl, init);
  const forecast = (await forecastResponse.json()) as ForecastData;
  console.log(forecast);
  const periods = forecast.properties.periods;

  res.status(200).json(periods);
}
