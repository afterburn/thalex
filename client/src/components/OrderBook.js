import React from 'react'
import OrderContext from '../context/OrderContext'

import Select, { Option } from './core/Select'

import sort from '../utils/sort'
import calculateSize from '../utils/calculate-size'
import calculateTotalSize from '../utils/calculate-total-size'
import formatPrice from '../utils/format-price'

const OrderBook = () => {
  const { mappedBuyOrders, mappedSellOrders, mark, setLimitOrderPrice, priceGrouping, setPriceGrouping } = React.useContext(OrderContext)

  const handleChangePriceGrouping = (e) => {
    // Change the price grouping.
    const value = Number(e.target.value)
    setPriceGrouping(value)

    // Store price grouping preference in localStorage.
    localStorage.setItem('priceGrouping', value)
  }

  React.useEffect(() => {
    // Check if the user has a price grouping preference and apply it.
    const pg = localStorage.getItem('priceGrouping')
    if (pg || pg === 0) {
      setPriceGrouping(Number(pg))
    }
  }, [])

  // Sort the buy and sell orders.
  const _buyOrders = Object.entries(mappedBuyOrders).sort(sort)
  const _sellOrders = Object.entries(mappedSellOrders).sort(sort)

  // Calculate buy and sell order totals.
  const buyTotals = calculateTotalSize(_buyOrders)
  const sellTotals = calculateTotalSize(_sellOrders)

  return <div className='order-book'>
    <div className='orders sell'>
      <div className='header'>Sell orders</div>
      <div className='items-header'>
        <span>Price</span>
        <span>Size</span>
        <span>Total</span>
      </div>
      <div className='items'>
        {_sellOrders.map(([price, orders], i) => {
            const size = calculateSize(orders)
            const total = sellTotals[i]
            return <div className='order' key={i} onClick={() => setLimitOrderPrice(Math.round(price))}>
              <span className='price'>{formatPrice(price)}</span>
              <span>{formatPrice(size)}</span>
              <span>{formatPrice(total)}</span>
            </div>
          })
        }
      </div>
    </div>
    <div className='mark'>
      <Select onChange={handleChangePriceGrouping} value={priceGrouping}>
        <Option value={0}>⛔</Option>
        <Option value={1}>1</Option>
        <Option value={2}>2</Option>
        <Option value={5}>5</Option>
        <Option value={10}>10</Option>
        <Option value={50}>50</Option>
        <Option value={100}>100</Option>
      </Select>
      <span>Mark: {formatPrice(mark)}</span>
    </div>
    <div className='orders buy'>
      <div className='header'>Buy orders</div>
      <div className='items-header'>
        <span>Price</span>
        <span>Size</span>
        <span>Total</span>
      </div>
      <div className='items'>
        {_buyOrders.map(([price, orders], i) => {
            const size = calculateSize(orders)
            const total = buyTotals[i]
            return <div className='order' key={i} onClick={() => setLimitOrderPrice(price)}>
              <span className='price'>{formatPrice(price)}</span>
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