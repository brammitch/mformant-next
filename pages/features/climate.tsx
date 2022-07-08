import { Space } from "@mantine/core";
import Head from "next/head";
import { useEffect, useState } from "react";
import useSWR from "swr";
import ClimateBar from "../../components/climate-bar";
import Counties from "../../components/counties";
import Layout from "../../components/layout";
import States from "../../components/states";
import Stations from "../../components/stations";
import { isWeatherApiError } from "../../lib/guards";
import {
  ClimateData,
  ForcastPeriodsOrError,
  ForecastPeriod,
  LocationData,
  StationData,
} from "../../lib/types";

const isForecastError = (d: ForcastPeriodsOrError) => {
  if (isWeatherApiError(d)) {
    return d.type;
  }

  return null;
};

export default function Climate() {
  const [selectedState, setSelectedState] = useState<LocationData>();
  const [selectedCounty, setSelectedCounty] = useState<LocationData>();
  const [selectedStation, setSelectedStation] = useState<StationData>();
  const [forecastError, setForecastError] = useState<string>();

  const { data: climateData } = useSWR<ClimateData[]>(() =>
    selectedStation?.id ? `/api/climate?id=${selectedStation.id}` : null
  );

  const { data: forecastData, isValidating } = useSWR<ForecastPeriod[]>(
    () =>
      selectedStation?.id
        ? `/api/forecast?lat=${selectedStation.latitude}&lon=${selectedStation.longitude}`
        : null,
    {
      dedupingInterval: 5000,
      errorRetryInterval: 6000,
      focusThrottleInterval: 6000,
    }
  );

  const readyToFetch =
    selectedState?.id && selectedCounty?.id && selectedStation?.id;

  const forecastReady =
    readyToFetch &&
    climateData &&
    climateData.length > 0 &&
    !isValidating &&
    forecastData &&
    forecastData.length > 0 &&
    !forecastError;

  useEffect(() => {
    if (readyToFetch && forecastData) {
      const error = isForecastError(forecastData);
      if (error) setForecastError(error);
    }

    if (!readyToFetch) {
      setForecastError(undefined);
    }
  }, [forecastData, readyToFetch]);

  return (
    <Layout>
      <Head>
        <title>Climate</title>
      </Head>
      <States setSelectedState={setSelectedState} />
      <Space h="sm" />
      {selectedState?.id && (
        <Counties
          stateId={selectedState?.id}
          setSelectedCounty={setSelectedCounty}
        />
      )}
      <Space h="sm" />
      {selectedState?.id && selectedCounty?.id && (
        <Stations
          countyId={selectedCounty?.id}
          setSelectedStation={setSelectedStation}
        />
      )}
      <Space h="lg" />
      {forecastError ? forecastError : null}
      {forecastReady && (
        <ClimateBar climateData={climateData} forecastData={forecastData} />
      )}
    </Layout>
  );
}
