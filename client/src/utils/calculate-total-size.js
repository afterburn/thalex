import calculateSize from './calculate-size'

// Function that calculates total accumulated size. 
export default (orders) => {
  let total = 0
  return orders.map(([price, _orders]) => {
    total += calculateSize(_orders)
    return total
  })
}