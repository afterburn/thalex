import React from 'react'
import ReactDOM from 'react-dom'

import OrderBook from './components/OrderBook'
import OrderForm from './components/OrderForm'
import DepthChart from './components/DepthChart'
import Header from './components/Header'

import { OrderContextProvider } from './context/OrderContext'

ReactDOM.render(
  <OrderContextProvider>
    <div className='app'>
      <Header />
      <div className='app-content'>
        <div className='app-content-left'>
          <DepthChart />
          <OrderForm />
        </div>
        <OrderBook />
      </div>
    </div>
  </OrderContextProvider>,
  document.getElementById('root')
)