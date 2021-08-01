import React from 'react'

const Input = (props) => {
  return <div className='field'>
    <label htmlFor={props.id}>{props.label}</label>
    <input id={props.id} {...props} />
  </div>
}

export default Input