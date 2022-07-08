/* NCDC/NOAA API */

interface Metadata {
  resultset: {
    offset: number;
    count: number;
    limit: number;
  };
}

export interface NcdcNoaaApi<T> {
  metadata: Metadata;
  results: T[];
}

export interface LocationData {
  mindate: string;
  maxdate: string;
  name: string;
  datacoverage: number;
  id: string;
}

export interface StationData {
  elevation: number;
  mindate: string;
  maxdate: string;
  latitude: number;
  name: string;
  datacoverage: number;
  id: string;
  elevationUnit: string;
  longitude: number;
}

export type ClimateDataType = "TMAX" | "TMIN" | "EMNT" | "EMXT" | "TAVG";

export interface ClimateData {
  date: string;
  datatype: ClimateDataType;
  station: string;
  attributes: string;
  value: number;
}

/* Weather.gov API */

export interface WeatherApiError {
  correlationId: string; // '3b5f6e65',
  title: string; // 'Unexpected Problem',
  type: string; // 'https://api.weather.gov/problems/UnexpectedProblem',
  status: number; // 500,
  detail: string; // 'An unexpected problem has occurred.',
  instance: string; // 'https://api.weather.gov/requests/3b5f6e65'
}

interface BaseContextObject {
  "@version": string;
  wx: string;
  geo: string;
  unit: string;
  "@vocab": string;
}

interface PointContextObject extends BaseContextObject {
  geometry: {
    "@id": string;
    "@type": string;
  };
  city: string;
  state: string;
  distance: {
    "@id": string;
    "@type": string;
  };
  bearing: {
    "@type": string;
  };
  value: {
    "@id": string;
  };
  unitCode: {
    "@id": string;
    "@type": string;
  };
  forecastOffice: {
    "@type": string;
  };
  forecastGridData: {
    "@type": string;
  };
  publicZone: {
    "@type": string;
  };
  county: {
    "@type": string;
  };
}

type PointContext = [string, PointContextObject];

export interface PointData {
  "@context": PointContext;
  id: string;
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  properties: {
    "@id": string;
    "@type": string;
    cwa: string;
    forecastOffice: string;
    gridId: string;
    gridX: number;
    gridY: number;
    forecast: string;
    forecastHourly: string;
    forecastGridData: string;
    observationStations: string;
    relativeLocation: {
      type: string;
      geometry: {
        type: string;
        coordinates: [number, number];
      };
      properties: {
        city: string;
        state: string;
        distance: {
          unitCode: string;
          value: number;
        };
        bearing: {
          unitCode: string;
          value: number;
        };
      };
    };
    forecastZone: string;
    county: string;
    fireWeatherZone: string;
    timeZone: string;
    radarStation: string;
  };
}

type ForecastContext = [string, BaseContextObject];

export interface ForecastPeriod {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  temperatureTrend: null;
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
}

type ForecastCoordinates = [number, number][][];

export interface ForecastData {
  "@context": ForecastContext;
  type: string;
  geometry: {
    type: string;
    coordinates: ForecastCoordinates;
  };
  properties: {
    updated: string;
    units: string;
    forecastGenerator: string;
    generatedAt: string;
    updateTime: string;
    validTimes: string;
    elevation: {
      unitCode: string;
      value: number;
    };
    periods: ForecastPeriod[];
  };
}

export type ForecastDataOrError = ForecastData | WeatherApiError;
export type ForcastPeriodsOrError = ForecastPeriod[] | WeatherApiError;
