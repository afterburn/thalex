export const getOrders = () => {
  return new Promise((resolve, reject) => {
    fetch('/orders', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(resolve)
      .catch(reject)
  })
}

export const insertOrder = (order) => {
  return new Promise((resolve, reject) => {
    fetch('/orders', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(order)
    })
      .then(res => res.json())
      .then(resolve)
      .catch(reject)
  })
}