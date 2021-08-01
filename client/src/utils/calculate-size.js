// Function that calculates orders' size.
export default (orders) => {
  return orders.reduce((acc, val) => {
    return acc + val.price * val.amount
  }, 0)
}