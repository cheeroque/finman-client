export function formatSum(number, precision = 0) {
  return parseFloat(number || 0).toLocaleString(undefined, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  })
}
