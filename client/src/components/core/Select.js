import React from 'react'

const Select = ({ children, value, onChange}) => {
  return <select value={value} onChange={onChange}>
    {children}
  </select>
}

export const Option = ({ children, value }) => {
  return <option value={value}>{children}</option>
}

export default Select