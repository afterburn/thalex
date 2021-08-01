// Functions that sorts order groups by price.
export default ([a], [b]) => {
  if (a > b) return -1
  else if (a < b) return 1
  return 0
}