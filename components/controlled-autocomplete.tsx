import { Autocomplete, AutocompleteProps } from "@mantine/core";
import { useAppColors } from "../hooks/useAppColors";

export default function ControlledAutocomplete(props: AutocompleteProps) {
  const { color } = useAppColors();

  return (
    <Autocomplete
      placeholder={props.placeholder}
      label={props.label}
      data={props.data}
      value={props.value}
      onChange={props.onChange}
      limit={props.limit}
      labelProps={{ style: { color } }}
    />
  );
}
