import { UploadFile } from "@mui/icons-material";
import { FormControl, FormHelperText, Typography } from "@mui/material";
import React from "react";
import { useDropzone } from "react-dropzone";
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  name: keyof T;
} & UseControllerProps<T>;

export default function AppDropzone<T extends FieldValues>(
  props: Props<T>
): React.ReactElement {
  const { fieldState, field } = useController({ ...props });

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        field.onChange(acceptedFiles[0]);
      }
    },
    [field]
  );

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({ onDrop });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const dzStyles = {
    border: "dashed 3px #767676",
    borderRadius: "5px",
    borderColor: "#767676",
    paddingTop: "30px",
    display: "flex",
    alignItems: "center",
    width: 500,
    height: 200,
  };

  const dzActive = { borderColor: "green" };

  return (
    <>
      <div {...getRootProps({ className: "dropzone" })}>
        <FormControl
          style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles}
          error={Boolean(fieldState.error)}
        >
          <input {...getInputProps()} />
          <UploadFile sx={{ fontSize: "100px" }} />
          <Typography variant="h5">Drop image here</Typography>
          <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </>
  );
}
