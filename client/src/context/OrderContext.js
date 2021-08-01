import React from 'react'

import { getOrders, insertOrder } from '../api'

import round from '../utils/round'

const OrderContext = React.createContext({})


// Function that sorts orders into the given price groupings.
const map = (orders, priceGrouping) => {
  const result = {}
  orders
    .map(order => order.price)
    .filter((value, index, self) => self.indexOf(value) === index)
    .forEach(price => {
      if (priceGrouping === 0) {
        // If priceGrouping = 0 then we group to nearest price.
        result[price] = orders.filter(order => {
          return Math.round(order.price) === Math.round(price)
        })
      } else {
        // Otherwise we group to the nearest priceGrouping.
        const rPrice = round(price, priceGrouping)
        result[rPrice] = orders.filter(order => {
          return round(order.price, priceGrouping) === rPrice
        })
      }
    })
  return result
}

let ws

export const OrderContextProvider = ({ children }) => {
  const [priceGrouping, setPriceGrouping] = React.useState(0)
  const [mark, setMark] = React.useState(0)
  const [buyOrders, setBuyOrders] = React.useState([])
  const [mappedBuyOrders, setMappedBuyOrders] = React.useState([])
  const [sellOrders, setSellOrders] = React.useState([])
  const [mappedSellOrders, setMappedSellOrders] = React.useState([])
  const [limitOrderPrice, setLimitOrderPrice] = React.useState('')
  const [isConnected, setIsConnected] = React.useState(false)

  const onReceiveData = data => {
    if (data.existing) {
      // Split into buy and sell groups.
      const newBuyOrders = data.existing.filter(order => order.side === 'buy')
      const newSellOrders = data.existing.filter(order => order.side === 'sell')

      // Apply data.
      setBuyOrders(newBuyOrders)
      setSellOrders(newSellOrders, priceGrouping)
    } else {
      // Split into buy and sell groups.
      let newBuyOrders = [...buyOrders, ...data.insert.filter(order => order.side === 'buy')]
      let newSellOrders = [...sellOrders, ...data.insert.filter(order => order.side === 'sell')]

      // Remove the deleted orders.
      newBuyOrders = newBuyOrders.filter(order => data.delete.indexOf(order.id) === -1)
      newSellOrders = newSellOrders.filter(order => data.delete.indexOf(order.id) === -1)

      // Apply data.
      setBuyOrders(newBuyOrders)
      setSellOrders(newSellOrders, priceGrouping)
      
      // Apply mark.
      setMark(data.mark)
    }
  }

  const updateOrders = async () => {
    const orders = await getOrders()
    // Split into buy and sell orders.
    const newBuyOrders = orders.filter(o => o.side === 'buy')
    const newSellOrders = orders.filter(o => o.side === 'sell')
    
    // Apply data.
    setBuyOrders(newBuyOrders)
    setSellOrders(newSellOrders, priceGrouping)
  }

  const insertAndUpdateOrders = async (order) => {
    await insertOrder(order)
    updateOrders()
  }

  const connect = () => {
    ws = new WebSocket('ws://localhost:8080')
    ws.onopen = () => {}
    ws.onerror = (err) => console.log(err)
    ws.onmessage = ({ data }) => onReceiveData(JSON.parse(data))
  }

  const disconnect = () => {
    if (ws) {
      ws.close()
    }
  }

  React.useEffect(() => {
    updateOrders()
  }, [])

  React.useEffect(() => {
    if (isConnected) {
      connect()
    } else {
      disconnect()
    }
  }, [isConnected])

  React.useEffect(() => {
    setMappedBuyOrders(map(buyOrders, priceGrouping))
    setMappedSellOrders(map(sellOrders, priceGrouping))
  }, [buyOrders, sellOrders, priceGrouping])

  const context = {
    buyOrders,
    mappedBuyOrders,
    sellOrders,
    mappedSellOrders,
    mark,
    insertOrder: insertAndUpdateOrders,
    updateOrders,
    limitOrderPrice,
    setLimitOrderPrice,
    priceGrouping,
    setPriceGrouping,
    isConnected,
    setIsConnected
  }
  
  return <OrderContext.Provider value={context}>
    {children}
  </OrderContext.Provider>
}

export default OrderContext