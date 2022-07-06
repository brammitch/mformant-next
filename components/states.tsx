import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useSWR from "swr";
import { LocationData, NcdcNoaaApi } from "../lib/types";
import ControlledAutocomplete from "./controlled-autocomplete";

interface StatesProps {
  setSelectedState: Dispatch<SetStateAction<LocationData | undefined>>;
}

export default function States({ setSelectedState }: StatesProps) {
  const [list, setList] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState("");

  const { data } = useSWR<NcdcNoaaApi<LocationData>>("/api/states");

  useEffect(
    () => setList(data?.results?.map((state) => state.name) ?? []),
    [data]
  );

  useEffect(
    () =>
      setSelectedState(
        data?.results?.find((state) => state.name === selectedItem)
      ),
    [data?.results, selectedItem, setSelectedState]
  );

  return (
    <ControlledAutocomplete
      placeholder={list[0] ?? "State"}
      label="State"
      data={list}
      value={selectedItem}
      onChange={setSelectedItem}
      limit={10}
    />
  );
}
