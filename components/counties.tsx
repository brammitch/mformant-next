import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useSWR from "swr";
import { LocationData } from "../lib/types";
import ControlledAutocomplete from "./controlled-autocomplete";

interface CountiesProps {
  stateId: string;
  setSelectedCounty: Dispatch<SetStateAction<LocationData | undefined>>;
}

export default function Counties({
  stateId,
  setSelectedCounty,
}: CountiesProps) {
  const [list, setList] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState("");

  const { data } = useSWR<LocationData[]>("/api/counties");

  useEffect(() => {
    setList(
      data
        ?.filter((county) => county.id.startsWith(stateId))
        ?.map((county) => county.name) ?? []
    );
  }, [data, stateId]);

  useEffect(
    () =>
      setSelectedCounty(data?.find((county) => county.name === selectedItem)),
    [data, selectedItem, setSelectedCounty]
  );

  return (
    <ControlledAutocomplete
      placeholder={list[0] ?? "County"}
      label="County"
      data={list}
      value={selectedItem}
      onChange={setSelectedItem}
      limit={10}
    />
  );
}
