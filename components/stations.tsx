import { Skeleton } from "@mantine/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useSWR from "swr";
import { StationData } from "../lib/types";
import ControlledAutocomplete from "./controlled-autocomplete";

interface StationsProps {
  countyId: string;
  setSelectedStation: Dispatch<SetStateAction<StationData | undefined>>;
}

export default function Stations({
  countyId,
  setSelectedStation,
}: StationsProps) {
  const [list, setList] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState("");
  const { data, isValidating } = useSWR<StationData[]>(() =>
    countyId ? `/api/stations?id=${countyId}` : null
  );

  useEffect(() => {
    setList(data?.map((station) => station.name) ?? []);
  }, [data]);

  useEffect(
    () =>
      setSelectedStation(
        data?.find((station) => station.name === selectedItem)
      ),
    [data, selectedItem, setSelectedStation]
  );

  return (
    <ControlledAutocomplete
      placeholder={
        isValidating
          ? "Station"
          : list.length > 0
          ? list[0]
          : "No stations available for the selected county"
      }
      label="Station"
      data={list}
      value={selectedItem}
      onChange={setSelectedItem}
      limit={10}
      loading={isValidating}
      onClear={() => {
        setSelectedItem("");
        setSelectedStation(undefined);
      }}
      disabled={!isValidating && list.length === 0}
    />
  );
}
