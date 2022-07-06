import { Space } from "@mantine/core";
import Head from "next/head";
import { useState } from "react";
import Counties from "../../components/counties";
import Layout from "../../components/layout";
import States from "../../components/states";
import Stations from "../../components/stations";
import { LocationData, StationData } from "../../lib/types";

export default function Climate() {
  const [selectedState, setSelectedState] = useState<LocationData>();
  const [selectedCounty, setSelectedCounty] = useState<LocationData>();
  const [selectedStation, setSelectedStation] = useState<StationData>();

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
      {selectedCounty?.id && (
        <Stations
          countyId={selectedCounty?.id}
          setSelectedStation={setSelectedStation}
        />
      )}
    </Layout>
  );
}
