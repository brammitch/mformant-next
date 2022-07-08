import { Space } from "@mantine/core";
import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";
import ClimateBar from "../../components/climate-bar";
import Counties from "../../components/counties";
import Layout from "../../components/layout";
import States from "../../components/states";
import Stations from "../../components/stations";
import {
  ClimateData,
  ForecastPeriod,
  LocationData,
  StationData,
} from "../../lib/types";

export default function Climate() {
  const [selectedState, setSelectedState] = useState<LocationData>();
  const [selectedCounty, setSelectedCounty] = useState<LocationData>();
  const [selectedStation, setSelectedStation] = useState<StationData>();

  const { data: climateData } = useSWR<ClimateData[]>(() =>
    selectedStation?.id ? `/api/climate?id=${selectedStation.id}` : null
  );

  const { data: forecastData } = useSWR<ForecastPeriod[]>(() =>
    selectedStation?.id
      ? `/api/forecast?lat=${selectedStation.latitude}&lon=${selectedStation.longitude}`
      : null
  );

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
      {selectedState?.id &&
        selectedCounty?.id &&
        selectedStation?.id &&
        climateData &&
        forecastData && (
          <ClimateBar climateData={climateData} forecastData={forecastData} />
        )}
    </Layout>
  );
}
