export function currencyFormat(amount: number): string {
  return `$` + (amount / 100).toFixed(2);
}

// Removes empty, null, undefined values and empty arrays
// from object
export function filterEmptyValuesFromObj(obj: object): Partial<object> {
  // Convert Object to Array
  const arr = Object.entries(obj);
  // Return Params Values that has value e.g. pageSize=8
  const filteredArr = arr.filter(
    ([, value]) =>
      value !== "" &&
      value !== null &&
      value !== undefined &&
      (!Array.isArray(value) || value.length !== 0)
  );
  // Convert Array back to Object
  return Object.fromEntries(filteredArr);
}
