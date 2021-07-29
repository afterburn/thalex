import React from 'react'
import OrderContext from '../context/OrderContext'

const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index
}

const formatPrice = (price) => {
  return Math.round(price).toLocaleString()
}

const getSize = (orders) => {
  return orders.reduce((acc, val) => {
    return acc + val.price * val.amount
  }, 0)
}

const getTotalSize = (_orders) => {
  let total = 0
  return _orders.map(([price, orders]) => {
    total += getSize(orders)
    return total
  })
}

const map = (orders) => {
  const result = {}
  orders
    .map(order => formatPrice(order.price))
    .filter(onlyUnique).forEach(price => {
      result[price] = orders.filter(order => {
        return formatPrice(order.price) === price
      })
    })
  return result
}
const OrderBook = () => {
  const { buyOrders, sellOrders, mark } = React.useContext(OrderContext)
  const _buyOrders = Object.entries(map(buyOrders)).sort(([a], [b]) => {
    if (a > b) return -1
    else if (a < b) return 1
    return 0
  })

  const _sellOrders = Object.entries(map(sellOrders)).sort(([a], [b]) => {
    if (a > b) return -1
    else if (a < b) return 1
    return 0
  })

  const _buyTotals = getTotalSize(_buyOrders)
  const _sellTotals = getTotalSize(_sellOrders)

  return <div className='order-book'>
    <div className='orders buy'>
      <div className='header'>Buy orders</div>
      <div className='items-header'>
        <span>Price</span>
        <span>Size</span>
        <span>Total</span>
      </div>
      <div className='items'>
        {_buyOrders.map(([price, orders], i) => {
            const size = getSize(orders)
            const total = _buyTotals[i]
            return <div className='order' key={i}>
              <span className='price'>{price}</span>
              <span>{formatPrice(size)}</span>
              <span>{formatPrice(total)}</span>
            </div>
          })
        }
      </div>
    </div>
    <div className='mark'>
      <span>Mark: {formatPrice(mark)}</span>
    </div>
    <div className='orders sell'>
      <div className='header'>Sell orders</div>
      <div className='items-header'>
        <span>Price</span>
        <span>Size</span>
        <span>Total</span>
      </div>
      <div className='items'>
        {_sellOrders.map(([price, orders], i) => {
            const size = getSize(orders)
            const total = _sellTotals[i]
            return <div className='order' key={i}>
              <span className='price'>{price}</span>
              <span>{formatPrice(size)}</span>
              <span>{formatPrice(total)}</span>
            </div>
          })
        }
      </div>
    </div>
  </div>
}

export default OrderBook