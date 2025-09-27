import { TextField, type TextFieldProps } from "@mui/material";
import React from "react";
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  label: string;
  name: keyof T;
} & UseControllerProps<T> &
  TextFieldProps;

export default function AppTextInput<T extends FieldValues>(
  props: Props<T>
): React.ReactElement {
  const { fieldState, field } = useController({ ...props });
  return (
    <TextField
      {...props}
      {...field}
      multiline={props.multiline}
      rows={props.rows}
      type={props.type}
      fullWidth
      value={field.value || ""}
      variant="outlined"
      error={Boolean(fieldState.error)}
      helperText={fieldState.error?.message}
    />
  );
}
