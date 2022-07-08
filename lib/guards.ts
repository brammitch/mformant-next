import {
  ForcastPeriodsOrError,
  ForecastData,
  ForecastDataOrError,
  WeatherApiError,
} from "./types";

export function isForecastData(
  data: ForecastDataOrError
): data is ForecastData {
  if ((data as ForecastData).properties) {
    return true;
  }

  return false;
}

export function isWeatherApiError(
  data: ForcastPeriodsOrError
): data is WeatherApiError {
  if ((data as WeatherApiError).detail) {
    return true;
  }

  return false;
}
