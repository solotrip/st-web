import React, { Component, useState, useLayoutEffect, useRef } from 'react'

import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import * as am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import useThemeState from 'utils/hooks/use-theme-state'

const Chart = ({ data, type, DOMroot = 'chartdiv3' }) => {
  const chartRef = useRef(null)
  const [appTheme] = useThemeState()
  const labelColor =
    appTheme === 'no-preference'
      ? am5.color(0xffffff)
      : appTheme === 'light'
      ? am5.color(0x000000)
      : am5.color(0xffffff)

  useLayoutEffect(() => {
    var root = am5.Root.new(DOMroot)
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false
      })
    )

    let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 })

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: 'name',
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
      })
    )

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
      })
    )

    xAxis.get('renderer').labels.template.setAll({
      fill: labelColor,
      oversizedBehavior: 'truncate',
      maxWidth: 120
    })

    yAxis.get('renderer').labels.template.setAll({ fill: labelColor })

    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'max',
        openValueYField: 'min',
        categoryXField: 'name'
      })
    )

    series.columns.template.setAll({
      templateField: 'columnConfig',
      strokeOpacity: 0
    })

    series.columns.template.setAll({
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      cornerRadiusBR: 5,
      cornerRadiusBL: 5,
      tooltipText: '[bold]{name}[/]\n{category}\nmin: {min}\nmax:{max}',
      tooltipY: 0,
      strokeOpacity: 0,
      templateField: 'columnConfig'
    })

    series.columns.template.adapters.add('fill', (fill, target) => {
      return chart.get('colors').getIndex(series.columns.indexOf(target))
    })

    series.columns.template.adapters.add('stroke', (stroke, target) => {
      return chart.get('colors').getIndex(series.columns.indexOf(target))
    })

    xAxis.data.setAll(data)
    series.data.setAll(data)

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000)
    chart.appear(1000, 100)
    ////

    chartRef.current = chart
    return () => {
      root.dispose()
    }
  }, [type])

  return (
    <div>
      <div
        id={DOMroot}
        style={{
          height: `calc(40vh)`,
          paddingBottom: '50px'
        }}
      ></div>
    </div>
  )
}

export default Chart
