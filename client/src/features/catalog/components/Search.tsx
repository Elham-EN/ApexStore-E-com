import React from "react";
import { debounce, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setSearchTerm } from "@/features/catalog/catalogSlice";

export default function Search(): React.ReactElement {
  const product = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  // Local state for immediate TextField value (shows user
  // typing in real-time)
  const [term, setTerm] = React.useState<string | undefined>(
    product.searchTerm
  );

  // Sync local state with Redux store when search term changes externally
  React.useEffect(() => {
    setTerm(product.searchTerm);
  }, [product.searchTerm]);

  // Create debounced search function once and reuse across renders
  // (prevents breaking debounce timer).
  // Waits 1 second after user stops typing before updating Redux
  // store (reduces unnecessary API calls)
  const debouncedSearch = React.useMemo(
    () =>
      debounce((value: string) => {
        dispatch(setSearchTerm(value));
      }, 1000),
    [dispatch]
  );

  return (
    <TextField
      label="Search product"
      variant="outlined"
      fullWidth
      type="search"
      value={term}
      onChange={(event) => {
        // Update local state immediately (user sees their typing)
        setTerm(event.target.value);
        // Update Redux store after 1 second delay
        debouncedSearch(event.target.value);
      }}
    />
  );
}
