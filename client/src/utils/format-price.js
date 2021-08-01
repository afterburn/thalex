// Rounds and formats a given price to a locale string.
export default (price) => {
  return Math.round(price).toLocaleString()
}