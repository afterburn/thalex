import React from 'react'

import Toggle from './core/Toggle'

import OrderContext from '../context/OrderContext'

import themes from '../themes'

const Header = () => {
  const { isConnected, setIsConnected } = React.useContext(OrderContext)

  const handleToggle = (val) => {
    // Toggle the isConnected flag which will cause websocket to either connect or disconnect.
    setIsConnected(val)
  }

  // Function that changes the theme css variables on the :root.
  const handleChangeTheme = value => {
    const style = document.documentElement.style
    const theme = themes[value]
    Object.entries(theme).forEach(([key, val]) => {
      style.setProperty(`--${key}`, val)
    })
    localStorage.setItem('theme', value)
  }

  React.useEffect(() => {
    // Check localStorage to see if user has a theme preference and apply it.
    const theme = localStorage.getItem('theme')
    if (theme) {
      handleChangeTheme(theme)
    }
  }, [])

  return <div className='app-header'>
    <div className='app-header-left'>
      <Toggle
        toggled={isConnected}
        onToggle={handleToggle}
        />
      <span>Use real-time data</span>
    </div>
    <h1>Thalex</h1>
    <div className='app-header-right theme'>
      <button className='theme-button light' onClick={() => handleChangeTheme('light')} />
      <button className='theme-button dark' onClick={() => handleChangeTheme('dark')} />
    </div>
  </div>
}

export default Header