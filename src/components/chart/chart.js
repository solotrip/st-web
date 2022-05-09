import React, { useLayoutEffect, useRef } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import useThemeState from 'utils/hooks/use-theme-state'
import styles from './chart.module.scss'
import am5Responsive from '@amcharts/amcharts5/themes/Responsive'

const Chart = ({ data, type, DOMroot = 'chartdiv3' }) => {
  const chartRef = useRef(null)
  const [appTheme] = useThemeState()
  const labelColor =
    appTheme === 'no-preference'
      ? am5.color(0xffffff)
      : appTheme === 'light'
      ? am5.color(0x000000)
      : am5.color(0xffffff)

  const bulletColor =
    appTheme === 'dark'
      ? am5.color(0xffffff)
      : appTheme === 'light'
      ? am5.color(0x000000)
      : appTheme === 'no-preference'
      ? am5.color(0xffffff)
      : am5.color(0x000000)

  useLayoutEffect(() => {
    var root = am5.Root.new(DOMroot)
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: false,
        y: 0
      })
    )

    let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 4 })

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
        tooltip: am5.Tooltip.new(root, {}),
        extraMax: 0.1
      })
    )

    xAxis.get('renderer').labels.template.setAll({
      fill: labelColor,
      oversizedBehavior: 'truncate',
      maxWidth: 200,
      rotation: -90,
      dx: -12,
      paddingRight: 30
    })

    yAxis.get('renderer').labels.template.setAll({ fill: labelColor })

    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'max',
        openValueYField: 'min',
        categoryXField: 'name',
        maskBullets: false
      })
    )

    series.columns.template.setAll({
      templateField: 'columnConfig',
      strokeOpacity: 0
    })

    const tooltip = am5.Tooltip.new(root, {
      autoTextColor: false
    })
    series.columns.template.setAll({
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      cornerRadiusBR: 5,
      cornerRadiusBL: 5,
      strokeOpacity: 0,
      tooltipText: '[bold]{name}[/]\n{category}\nmin: {min}\nmax:{max}',
      tooltipY: 0,
      minHeight: 5,
      templateField: 'columnConfig'
    })

    series.columns.template.setup = function (target) {
      target.set('tooltip', tooltip)
    }

    root.numberFormatter.setAll({
      numberFormat: '###.0',
      numericFields: ['min', 'max']
    })

    series.columns.template.adapters.add('fill', (fill, target) => {
      return chart.get('colors').getIndex(series.columns.indexOf(target))
    })

    series.columns.template.adapters.add('stroke', (stroke, target) => {
      return chart.get('colors').getIndex(series.columns.indexOf(target))
    })

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationY: 0,
        sprite: am5.Label.new(root, {
          populateText: true,
          centerX: am5.p50,
          centerY: am5.p0,
          text: '{min}',
          fill: bulletColor,
          fontSize: 14,
          textAlign: 'center',
          fontWeight: 700
        })
      })
    })

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationY: 1,
        sprite: am5.Label.new(root, {
          populateText: true,
          centerX: am5.p50,
          centerY: am5.p100,
          text: '{max}',
          fill: bulletColor,
          fontSize: 14,
          textAlign: 'center',
          fontWeight: 700
        })
      })
    })
    const responsive = am5Responsive.newEmpty(root)
    responsive.addRule({
      relevant: am5Responsive.widthL,
      applying: function () {
        xAxis.zoomToIndexes(0, 3)
        xAxis.events.once('datavalidated', function (ev) {
          ev.target.zoomToIndexes(0, 3)
        })
      },
      removing: function () {
        xAxis.zoomToIndexes(0, 10)
        xAxis.events.once('datavalidated', function (ev) {
          ev.target.zoomToIndexes(0, 10)
        })
      }
    })
    root.setThemes([responsive])

    chart.zoomOutButton.set('forceHidden', true)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DOMroot])

  return <div id={DOMroot} className={styles.container} />
}

export default Chart
