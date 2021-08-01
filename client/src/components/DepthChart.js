import React from 'react'

import OrderContext from '../context/OrderContext'

import sort from '../utils/sort'
import calculateTotalSize from '../utils/calculate-total-size'
import chartOptions from './DepthChart.options'

const DepthChart = () => {
  const chartElementRef = React.useRef()
  const chartRef = React.useRef()
  const { mappedBuyOrders, mappedSellOrders, mark } = React.useContext(OrderContext)

  const handleResize = () => {
    // Trigger reflow in chart.
    chartRef.current.reflow()
  }

  React.useEffect(() => {
    // Initialize the chart.
    chartRef.current = Highcharts.chart(chartElementRef.current, chartOptions)

    // Bind resizeHandler which is needed for updating the chart.
    window.addEventListener('resize', handleResize)

    return () => {
      // Unbind resizeHandler.
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  React.useEffect(() => {
    if (mappedBuyOrders.length === 0 || mappedSellOrders.length === 0) {
      return
    }
  
    // Sort the buy and sell orders.
    const _buyOrders = Object.entries(mappedBuyOrders).sort(sort)
    const _sellOrders = Object.entries(mappedSellOrders).sort(sort)

    // Calculate totals.
    const buyTotals = calculateTotalSize(_buyOrders)
    const sellTotals = calculateTotalSize(_sellOrders)

    // Get references to the chart
    const chart = chartRef.current
    const sellChartData = chart.series[0]
    const buyChartData = chart.series[1]
    const markLine = chart.xAxis[0].options.plotLines[0]

    // Update buy order data.
    buyChartData.setData(_buyOrders.map(([price, orders], i) => {
      const total = buyTotals[i]
      return [Math.round(Number(price)), total]
    }).reverse())

    // Update sell order data.
    sellChartData.setData(_sellOrders.reverse().map(([price, orders], i) => {
      const total = sellTotals[i]
      return [Math.round(Number(price)), total]
    }))
    
    // Update the mark line.
    markLine.value = mark
  }, [mappedBuyOrders, mappedSellOrders, mark, chartRef.current])

  return <div className='depth-chart' ref={chartElementRef} />
}

export default DepthChart