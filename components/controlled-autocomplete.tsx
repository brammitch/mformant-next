import {
  ActionIcon,
  Autocomplete,
  AutocompleteProps,
  Loader,
} from "@mantine/core";
import { X } from "tabler-icons-react";
import { useAppColors } from "../hooks/useAppColors";

interface ControlledAutocompleteProps extends AutocompleteProps {
  loading?: boolean;
  onClear: () => void;
}

export default function ControlledAutocomplete(
  props: ControlledAutocompleteProps
) {
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
      rightSection={
        props.loading ? (
          <Loader size="xs" />
        ) : (
          <ActionIcon variant="transparent" onClick={props.onClear}>
            <X size={12} />
          </ActionIcon>
        )
      }
      disabled={props.loading}
    />
  );
}
