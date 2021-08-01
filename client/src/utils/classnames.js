// Function that creates a string that can be used
// as a className from both a given collection of 
// strings and an object that holds true or false values.
export default function () {
  const args = Array.from(arguments)
  const obj = args.pop()
  let result = args

  Object.entries(obj).forEach(([key, value]) => {
    if (value) {
      result.push(key)
    }
  })

  return result.join(' ')
}
