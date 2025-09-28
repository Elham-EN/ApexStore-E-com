import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import type { SelectInputProps } from "node_modules/@mui/material/esm/Select/SelectInput";
import React from "react";
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  label: string;
  name: keyof T;
  items: string[];
} & UseControllerProps<T> &
  Partial<SelectInputProps>;

export default function AppSelectInput<T extends FieldValues>(
  props: Props<T>
): React.ReactElement {
  const { fieldState, field } = useController({ ...props });
  return (
    <FormControl fullWidth error={Boolean(fieldState.error)}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        value={field.value || ""}
        label={props.label}
        onChange={field.onChange}
      >
        {props.items.map((item, index) => (
          <MenuItem value={item} key={index}>
            {item}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );
}
