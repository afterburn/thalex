// Clamps a given value n between min and max.
export default (n, min, max) => {
  let r = n
  if (r > max) r = max
  else if (r < min) r = min
  return r
}