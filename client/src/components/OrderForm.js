import React from 'react'
import OrderContext from '../context/OrderContext'

import Form from './core/Form'
import Input from './core/Input'

import clamp from '../utils/clamp'

const OrderForm = () => {
  const { insertOrder, limitOrderPrice, setLimitOrderPrice } = React.useContext(OrderContext)
  const [amount, setAmount] = React.useState('')

  const handleSetLimitOrderPrice = value => {
    // Make sure price is always positive.
    const price = clamp(value, 0, Infinity)
    
    // Update price field state.
    setLimitOrderPrice(price)
  }

  const handleSetLimitOrderAmount = value => {
    // Make sure amount is always positive.
    const amount = clamp(value, 0, Infinity)

    // Update amount field state.
    setAmount(amount)
  }

  // Function that will insert buy or sell order into the api.
  const handleSubmit = async (form, side) => {
    // In practice I would add some validation here to make sure
    // the form data adheres to API requirements.
    const amount = Number(form.amount.value)
    const price = Number(form.price.value)

    if (amount !== 0 && price !== 0) {
      await insertOrder({
        amount,
        price,
        side
      })
    }
  }

  return <div className='order-form'>
    <div className='header'>Limit order</div>
    <Form onSubmit={handleSubmit}>
      <Input
        id='amount'
        type='number'
        label='Amount'
        name='amount'
        placeholder='Amount'
        onChange={(e) => handleSetLimitOrderAmount(Number(e.target.value))}
        value={amount}
        required
      />
      <Input
        id='price'
        type='number'
        label='Price'
        name='price'
        placeholder='Price'
        onChange={(e) => handleSetLimitOrderPrice(Number(e.target.value))}
        value={limitOrderPrice}
        required
      />
      <div className='buttons'>
        <Form.Submit name='buy' color='confirm'>Buy</Form.Submit>
        <Form.Submit name='sell' color='warn'>Sell</Form.Submit>
      </div>
    </Form>
  </div>
}

export default OrderForm