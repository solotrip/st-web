import React, { useLayoutEffect } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import  am5Responsive from '@amcharts/amcharts5/themes/Responsive'

import useThemeState from 'utils/hooks/use-theme-state'
import styles from './table.module.scss'
const Table = ({
  valuesX,
  valuesY,
  data,
  DOMroot = 'chartdiv4',
  showContent = true
}) => {
  const [appTheme] = useThemeState()
  const labelColor =
    appTheme === 'no-preference'
      ? am5.color(0xffffff)
      : appTheme === 'light'
        ? am5.color(0x000000)
        : am5.color(0xffffff)

  const strokeColor =
    appTheme === 'no-preference'
      ? am5.color(0x000000)
      : appTheme === 'light'
        ? am5.color(0xffffff)
        : am5.color(0x000000)
  useLayoutEffect(() => {
    var root = am5.Root.new(DOMroot)

    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: false,
        wheelX: 'none',
        wheelY: 'none',
        layout: root.verticalLayout
      })
    )

    var yRenderer = am5xy.AxisRendererY.new(root, {
      visible: false,
      minGridDistance: 4,
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
      minGridDistance: 4
    })

    xRenderer.grid.template.set('visible', false)
    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: xRenderer,
        categoryField: 'category'
      })
    )

    yAxis.get('renderer').labels.template.setAll({
      fill: labelColor,
      maxWidth: 120,
      oversizedBehavior: 'wrap',
      textAlign: 'right'
    })
    xAxis.get('renderer').labels.template.setAll({
      fill: labelColor,
      oversizedBehavior: 'truncate',
      maxWidth: 90,
      rotation: -90,
      valign: 'middle',
      dx: -12
    })

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/#Adding_series
    var series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        stroke: strokeColor,
        xAxis: xAxis,
        yAxis: yAxis,
        categoryXField: 'x',
        categoryYField: 'y',
        valueField: 'value',
        panX: true,
        panY: false
      })
    )

    series.columns.template.setAll({
      tooltipText: '[bold]{y} in\n{x}\n{rawValue}[/]',
      strokeOpacity: 1,
      strokeWidth: 2,
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      cornerRadiusBL: 5,
      cornerRadiusBR: 5,
      width: 50,
      height: 40,
      templateField: 'columnSettings'
    })

    const tooltip = am5.Tooltip.new(root, {
      autoTextColor: false
    })

    series.columns.template.setup = function(target) {
      target.set('tooltip', tooltip)
    }

    const responsive =am5Responsive.newEmpty(root)
    responsive.addRule({
      relevant: am5Responsive.widthL,
      applying: function() {
        xAxis.zoomToIndexes(0, 3)
        xAxis.events.once('datavalidated', function(ev) {
          ev.target.zoomToIndexes(0, 3)
        })
      },
      removing: function() {
        xAxis.zoomToIndexes(0, 10)
        xAxis.events.once('datavalidated', function(ev) {
          ev.target.zoomToIndexes(0, 10)
        })
      }
    })

    root.setThemes([
      responsive
    ])

    chart.zoomOutButton.set('forceHidden', true)

    // Add scrollbar
    if (showContent) {
      series.bullets.push(function() {
        return am5.Bullet.new(root, {
          sprite: am5.Label.new(root, {
            populateText: true,
            centerX: am5.p50,
            centerY: am5.p50,
            text: '{value}',
            fill: am5.color(0xffffff),
            fontSize: 16,
            textAlign: 'center',
            fontWeight: 700
          })
        })
      })
    }

    series.data.setAll(data)

    yAxis.data.setAll(valuesY)

    xAxis.data.setAll(valuesX)
    // Make stuff animate on load
    chart.appear(1000, 100)
    return () => {
      root.dispose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DOMroot])

  return (
    <div id={DOMroot} className={styles.container}/>
  )
}

export default Table
