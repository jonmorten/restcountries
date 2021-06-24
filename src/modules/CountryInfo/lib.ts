export const formatPopulation = (value: number): string => {
  const formattedValue = (value / 1000000).toFixed(1);
  return formattedValue === "0.0" ? "0.1" : formattedValue;
};
