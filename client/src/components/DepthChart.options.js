export default {
  chart: {
    type: 'area',
    zoomType: 'xy',
    backgroundColor: 'var(--appBackground)',
    plotBorderColor: 'var(--accent)',
    plotBackgroundColor: 'var(--chartBackground)',
    animation: false
  },
  credits: false,
  title: {
    text: null
  },
  xAxis: {
    minPadding: 0,
    maxPadding: 0,
    lineColor: 'var(--accent)',
    tickColor: 'var(--accent)',
    gridLineColor: 'var(--accent)',
    plotLines: [{
      color: 'var(--accent)',
      value: 0.1523,
      width: 1
    }],
    labels: {
      style: {
        color: 'var(--textColor)'
      }
    }
  },
  yAxis: [{
    lineWidth: 1,
    lineColor: 'var(--accent)',
    gridLineColor: 'var(--accent)',
    gridLineWidth: 1,
    title: null,
    tickWidth: 1,
    tickLength: 5,
    tickColor: 'var(--accent)',
    tickPosition: 'inside',
    labels: {
      align: 'left',
      x: 8,
      style: {
        color: 'var(--textColor)'
      }
    }
  },{
    opposite: true,
    linkedTo: 0,
    lineWidth: 1,
    lineWidth: 1,
    lineColor: 'var(--accent)',
    gridLineColor: 'var(--accent)',
    gridLineWidth: 0,
    title: null,
    tickWidth: 1,
    tickLength: 5,
    tickColor: 'var(--accent)',
    tickPosition: 'inside',
    labels: {
      align: 'right',
      x: -8,
      style: {
        color: 'var(--textColor)'
      }
    }
  }],
  legend: {
    enabled: false
  },
  plotOptions: {
    area: {
      fillOpacity: 0.2,
      lineWidth: 1,
      step: 'center'
    },
    series: {
      marker: {
        enabled: false
      }
    }
  },
  tooltip: {
    headerFormat: '<span style="font-size=10px;">Price: {point.key}</span><br/>',
    valueDecimals: 2
  },
  series: [{
    name: 'Sells',
    data: [],
    color: '#fc5857',
    animation: false
  }, {
      name: 'Buys',
      data: [],
      color: '#03a7a8',
      animation: false
  }]
}