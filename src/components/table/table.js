import React, { Component, useState, useRef, useLayoutEffect } from 'react'

import { useHistory } from 'react-router'

import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import * as am5themes_Animated from '@amcharts/amcharts5/themes/Frozen'
import am5geodata_world from '@amcharts/amcharts5-geodata/worldLow'

var imageSize = 34
const Table = ({
  valuesX,
  valuesY,
  colors,
  data,
  originCities,
  destinationCities,
  queryString,
  basePath
}) => {
  const history = useHistory()
  const chartRef = useRef(null)

  useLayoutEffect(() => {
    var root = am5.Root.new('chartdiv4')
    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'none',
        wheelY: 'none',
        layout: root.verticalLayout
      })
    )

    var yRenderer = am5xy.AxisRendererY.new(root, {
      visible: false,
      minGridDistance: 20,
      inversed: true
    })

    yRenderer.grid.template.set('visible', false)

    var yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: yRenderer,
        categoryField: 'category'
      })
    )

    var xRenderer = am5xy.AxisRendererX.new(root, {
      visible: false,
      minGridDistance: 10,
      inversed: true
    })

    xRenderer.grid.template.set('visible', false)
    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: xRenderer,
        categoryField: 'category'
      })
    )

    yAxis.get('renderer').labels.template.setAll({ fill: am5.color(0xffffff) })
    xAxis.get('renderer').labels.template.setAll({
      fill: am5.color(0xffffff),
      oversizedBehavior: 'truncate',
      maxWidth: 100
    })

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/#Adding_series
    var series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        calculateAggregates: false,
        stroke: am5.color(0x000000),
        clustered: false,
        xAxis: xAxis,
        yAxis: yAxis,
        categoryXField: 'x',
        categoryYField: 'y',
        valueField: 'value'
      })
    )

    series.columns.template.setAll({
      tooltipText: '{y} in {x}\n{value}',
      strokeOpacity: 1,
      strokeWidth: 2,
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      cornerRadiusBL: 5,
      cornerRadiusBR: 5,
      width: am5.percent(100),
      height: am5.percent(100),
      templateField: 'columnSettings'
    })

    var circleTemplate = am5.Template.new({})

    // Add heat rule
    // https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
    series.set('heatRules', [
      {
        target: circleTemplate,
        min: 0,
        max: 10,
        dataField: 'value',
        key: 'radius'
      }
    ])

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(
          root,
          {
            fillOpacity: 0.5,
            strokeOpacity: 0
          },
          circleTemplate
        )
      })
    })

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Label.new(root, {
          populateText: true,
          centerX: am5.p50,
          centerY: am5.p50,
          text: '{value}'
        })
      })
    })

    series.data.setAll(data)

    yAxis.data.setAll(valuesY)

    xAxis.data.setAll(valuesX)

    // Make stuff animate on load
    chart.appear(1000, 100)
    chartRef.current = chart
    return () => {
      root.dispose()
    }
  }, [])

  return (
    <div>
      <div id='chartdiv4' style={{ height: `calc(40vh)` }}></div>
    </div>
  )
}

export default Table