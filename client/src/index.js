import React from 'react'
import ReactDOM from 'react-dom'

import OrderBook from './components/OrderBook'
import OrderForm from './components/OrderForm'

import { OrderContextProvider } from './context/OrderContext'

ReactDOM.render(
  <OrderContextProvider>
    <div className='app'>
      <OrderForm />
      <OrderBook />
    </div>
  </OrderContextProvider>,
  document.getElementById('root')
)