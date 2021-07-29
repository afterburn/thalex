import React from 'react'

const OrderContext = React.createContext({})

const getMark = () => {
  return new Promise((resolve, reject) => {
    fetch('/mark', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(resolve)
      .catch(reject)
  })
}

const getOrders = () => {
  return new Promise((resolve, reject) => {
    fetch('/orders', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(resolve)
      .catch(reject)
  })
}

const insertOrder = () => {
  return new Promise((resolve, reject) => {
    fetch('/orders', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        side: 'buy',
        price: 1,
        amount: 9999
      })
    })
      .then(res => res.json())
      .then(resolve)
      .catch(reject)
  })
}

export const OrderContextProvider = ({ children }) => {
  const [mark, setMark] = React.useState(0)
  const [buyOrders, setBuyOrders] = React.useState([])
  const [sellOrders, setSellOrders] = React.useState([])

  const onReceiveData = data => {
    if (data.existing) {
      const newBuyOrders = data.existing.filter(order => order.side === 'buy')
      const newSellOrders = data.existing.filter(order => order.side === 'sell')
      setBuyOrders(newBuyOrders)
      setSellOrders(newSellOrders)
    } else {
      let newBuyOrders = [...buyOrders, ...data.insert.filter(order => order.side === 'buy')]
      let newSellOrders = [...sellOrders, ...data.insert.filter(order => order.side === 'sell')]

      newBuyOrders = newBuyOrders.filter(order => data.delete.indexOf(order.id) === -1)
      newSellOrders = newSellOrders.filter(order => data.delete.indexOf(order.id) === -1)

      setBuyOrders(newBuyOrders)
      setSellOrders(newSellOrders)
      setMark(data.mark)
    }
  }

  async function initialize () {
    const orders = await getOrders()
    setBuyOrders(orders.filter(o => o.side === 'buy'))
    setSellOrders(orders.filter(o => o.side === 'sell'))
  }

  React.useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080')
    ws.onopen = () => console.log('connected to ws')
    ws.onerror = (err) => console.log(err)
    ws.onmessage = ({ data }) => onReceiveData(JSON.parse(data))
    initialize()
  }, [])

  const context = {
    buyOrders,
    sellOrders,
    mark
  }
  
  return <OrderContext.Provider value={context}>
    {children}
  </OrderContext.Provider>
}

export default OrderContext