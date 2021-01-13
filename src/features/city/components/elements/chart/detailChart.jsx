import React from 'react'
import styles from './detailChart.module.scss'
import Chart from 'react-apexcharts'

import forestImage from '../../../../../assets/images/forest.jpg'

const DetailChart = ({
  type = 'line-chart-blue',
  inspecting = 'Popularity Score',
  yaxis = 'Number of People',
  chartData,
  chartName,
  chartLabels
}) => {
  var styleType
  var state
  var heightHolder
  const lineChart = {
    series: [
      {
        name: 'People',
        data: chartData
      }
    ],
    options: {
      chart: {
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        },
        height: 250,
        type: 'line',
        toolbar: {
          tools: {
            download: false,
            selection: true,
            zoom: false,
            zoomin: true,
            zoomout: true,
            pan: false,
            reset: false
          }
        }
      },
      stroke: {
        width: 7,
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: chartLabels,
        tickAmount: 10,
        labels: {}
      },
      title: {
        text: `Inspecting: ${chartName}`,
        align: 'left',
        style: {
          fontSize: '16px',
          color: '#666'
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors:
            type === 'line-chart-blue'
              ? ['#B6B6B6', '#BADDF4', '#3282B6']
              : ['#FF1C1C', '#0099FF'],
          shadeIntensity: 1,
          type: 'vertical',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      },
      markers: {
        size: 4,
        colors: ['#B6B6B6'],
        strokeColors: '#FFF',
        strokeWidth: 2,
        hover: {
          size: 7
        }
      },
      yaxis: {
        min: -10,
        max: 40,
        title: {
          text: `${yaxis}`
        }
      }
    }
  }

  const pieChart = {
    series: chartData,
    options: {
      stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: undefined,
        width: 2,
        dashArray: 0
      },
      colors: ['#50ACE9', '#E4897B', '#B6B6B6', '#4D4D4D', '#7be48b'],
      tooltip: {
        show: false
      },
      legend: {
        show: false
      },
      markers: {
        colors: ['#50ACE9', '#E4897B', '#B6B6B6', '#4D4D4D', '#7be48b']
      },
      dataLabels: {
        enabled: true,
        style: {},
        formatter: function (value, { seriesIndex, dataPointIndex, w }) {
          return (
            w.config.labels[seriesIndex] +
            '\n' +
            Math.round(value * 10) / 10 +
            '%'
          )
        }
      },
      fill: {
        colors: ['#50ACE9', '#E4897B', '#B6B6B6', '#4D4D4D', '#7be48b']
      },
      chart: {
        width: 280,
        type: 'pie'
      },
      labels: chartLabels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 150
            },
            legend: {
              show: true,
              horizontalAlign: 'center'
            }
          }
        }
      ]
    }
  }

  const forest2 = {
    series: chartData,
    options: {
      stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: undefined,
        width: 2,
        dashArray: 0
      },
      plotOptions: {
        pie: {
          donut: {
            size: '25%'
          }
        }
      },
      colors: ['#50ACE9', '#E4897B', '#B6B6B6', '#4D4D4D'],
      tooltip: {
        show: false
      },
      legend: {
        show: false
      },
      markers: {
        colors: ['#50ACE9', '#E4897B', '#B6B6B6', '#4D4D4D']
      },
      dataLabels: {
        background: {
          enabled: true,
          foreColor: '#fff',
          borderWidth: 0
        },
        enabled: true,
        style: {},
        formatter: function (value, { seriesIndex, dataPointIndex, w }) {
          return (
            w.config.labels[seriesIndex] +
            '\n' +
            Math.round(value * 10) / 10 +
            '%'
          )
        }
      },
      fill: {
        type: 'image',
        opacity: 1.0,
        image: {
          src: [forestImage, '#00000'],
          width: 125,
          imagedHeight: 125
        }
      },
      chart: {
        width: 280,
        type: 'donut'
      },
      labels: chartLabels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 150
            },
            legend: {
              show: true,
              horizontalAlign: 'center'
            }
          }
        }
      ]
    }
  }

  const radar = {
    series: [
      {
        name: 'People',
        data: chartData
      }
    ],
    options: {
      chart: {
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        },
        height: 350,
        type: 'radar',
        toolbar: {
          tools: {
            download: false,
            selection: true,
            zoom: false,
            zoomin: true,
            zoomout: true,
            pan: false,
            reset: false
          }
        }
      },
      stroke: {
        width: 1,
        curve: 'smooth'
      },
      xaxis: {
        categories: chartLabels,
        tickAmount: 10,
        labels: {}
      },
      title: {},
      fill: {
        type: 'color'
      },
      markers: {
        size: 4,
        colors: ['#50ACE9', '#E4897B', '#B6B6B6', '#4D4D4D', '#7be48b'],
        strokeColors: '#FFF',
        strokeWidth: 2,
        hover: {
          size: 7
        }
      }
    }
  }

  if (type == 'line-chart-blue') {
    state = lineChart
    heightHolder = 350
    styleType = 'line'
  } else if (type == 'line-chart-red') {
    state = lineChart
    heightHolder = 350
    styleType = 'line'
  } else if (type == 'pie-chart') {
    state = pieChart
    heightHolder = 350
    styleType = 'pie'
  } else if (type == 'forest') {
    state = forest2
    heightHolder = 350
    styleType = 'donut'
  } else if (type == 'radar') {
    state = radar
    heightHolder = 600
    styleType = 'radar'
  } else {
    state = lineChart
    heightHolder = 350
    styleType = 'line'
  }

  return (
    <div
      className={
        (type == 'line-chart-red') | (type == 'line-chart-blue')
          ? styles.lineWrapper
          : styles.pieWrapper
      }
    >
      <div id='chart'>
        <Chart
          options={state.options}
          series={state.series}
          type={styleType}
          height={heightHolder}
        />
      </div>
    </div>
  )
}

export default DetailChart
