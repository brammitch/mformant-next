import type { NextApiRequest, NextApiResponse } from "next";
import { isForecastData } from "../../lib/guards";
import {
  ForecastData,
  ForecastDataOrError,
  ForecastPeriod,
  PointData,
  WeatherApiError,
} from "../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ForecastPeriod[] | WeatherApiError>
) {
  const { lat, lon } = req.query;
  const userAgent = process.env.WEATHER_GOV_AGENT as string;
  const headers = new Headers({ "User-Agent": userAgent });
  const init: RequestInit = {
    method: "GET",
    headers,
  };

  const pointsUrl = `https://api.weather.gov/points/${lat},${lon}`;
  const pointsResponse = await fetch(pointsUrl, init);
  const points = (await pointsResponse.json()) as PointData;

  const forecastUrl = points.properties.forecast;
  const forecastResponse = await fetch(forecastUrl, init);
  const forecast = (await forecastResponse.json()) as
    | ForecastData
    | WeatherApiError;

  console.log(forecast);

  let status: number = 200;
  let error: WeatherApiError = {} as WeatherApiError;

  const periods = (d: ForecastDataOrError) => {
    if (isForecastData(d)) {
      return d.properties.periods;
    }

    status = d.status;
    error = d;
    return null;
  };

  const response = periods(forecast);

  if (response !== null) {
    res.status(200).json(response);
  } else {
    res.status(status).json(error);
  }
}
function checkForecastData(d: ForecastDataOrError) {
  throw new Error("Function not implemented.");
}
