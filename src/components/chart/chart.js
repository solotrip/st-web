import React, { Component, useState, useLayoutEffect, useRef } from 'react'

import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import * as am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

const Chart = ({ data: dataParam }) => {
  const chartRef = useRef(null)
  useLayoutEffect(() => {
    var root = am5.Root.new('chartdiv3')
    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'none',
        wheelY: 'none'
      })
    )

    var cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}))
    cursor.lineY.set('visible', false)

    var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 })

    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: 'name',
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
      })
    )

    xRenderer.grid.template.set('visible', false)

    var yRenderer = am5xy.AxisRendererY.new(root, {})
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: 0,
        extraMax: 0.1,
        renderer: yRenderer
      })
    )
    xAxis.get('renderer').labels.template.setAll({ fill: am5.color(0xffffff) })

    yAxis.get('renderer').labels.template.setAll({ fill: am5.color(0xffffff) })

    yRenderer.grid.template.setAll({
      strokeDasharray: [2, 2]
    })

    var series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Series 1',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        sequencedInterpolation: true,
        categoryXField: 'name',
        tooltip: am5.Tooltip.new(root, { dy: -25, labelText: '{valueY}' })
      })
    )
    series.columns.template.setAll({
      cornerRadiusTL: 5,
      cornerRadiusTR: 5
    })

    series.columns.template.adapters.add('fill', (fill, target) => {
      return chart.get('colors').getIndex(series.columns.indexOf(target))
    })

    series.columns.template.adapters.add('stroke', (stroke, target) => {
      return chart.get('colors').getIndex(series.columns.indexOf(target))
    })

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationY: 1,
        sprite: am5.Picture.new(root, {
          templateField: 'bulletSettings',
          width: 50,
          height: 50,
          centerX: am5.p50,
          centerY: am5.p50,
          shadowColor: am5.color(0x000000),
          shadowBlur: 4,
          shadowOffsetX: 4,
          shadowOffsetY: 4,
          shadowOpacity: 0.6
        })
      })
    })

    xAxis.data.setAll(dataParam)
    series.data.setAll(dataParam)

    series.appear(1000)
    chart.appear(1000, 100)
    chartRef.current = chart
    return () => {
      root.dispose()
    }
  }, [dataParam])

  return (
    <div>
      <div
        id='chartdiv3'
        style={{
          height: `calc(40vh)`,
          paddingBottom: '50px'
        }}
      ></div>
    </div>
  )
}

export default Chart
