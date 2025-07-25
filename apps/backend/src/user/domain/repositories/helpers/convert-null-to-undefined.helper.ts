export const convertNullToUndefined = <T>(value: T | null): NonNullable<T> | undefined => {
  if (value !== null) {
    return value;
  }
  return undefined;
};
