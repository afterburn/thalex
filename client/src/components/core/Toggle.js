import React from 'react'
import cn from '../../utils/classnames'

const Toggle = ({ className, toggled, onToggle }) => {
  return <div className={cn(className, 'toggle', { toggled })} onClick={() => onToggle(!toggled)}>
    <div />
  </div>
}

export default Toggle