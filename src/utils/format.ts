export const useFormatCurrency = (value: number, getNumberOnly = false) => {
  return new Intl.NumberFormat('en-US', {
    style: getNumberOnly ? 'decimal' : 'currency',
    currency: 'USD',
  }).format(value);
};
