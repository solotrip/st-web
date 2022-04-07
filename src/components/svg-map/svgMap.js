import React, { Component, useState, useRef, useLayoutEffect } from 'react'

import { useHistory } from 'react-router'

import * as am5 from '@amcharts/amcharts5'
import * as am5map from '@amcharts/amcharts5/map'
import * as am5themes_Animated from '@amcharts/amcharts5/themes/Frozen'
import am5geodata_world from '@amcharts/amcharts5-geodata/worldLow'

const SvgMap = ({ originCities, destinationCities, queryString, basePath }) => {
  const history = useHistory()
  const chartRef = useRef(null)

  useLayoutEffect(() => {
    var root = am5.Root.new('chartdiv')
    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        projection: am5map.geoMercator()
      })
    )
    var polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, { geoJSON: am5geodata_world })
    )
    polygonSeries.mapPolygons.template.setAll({ fill: am5.color(0x181d26) })

    var lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}))
    lineSeries.mapLines.template.setAll({
      strokeWidth: 2,
      strokeOpacity: 0.5
    })
    lineSeries.mapLines.template.set(
      'strokeGradient',
      am5.LinearGradient.new(root, {
        stops: [
          {
            color: am5.color(0x12c2e9)
          },
          {
            color: am5.color(0xc471ed)
          },
          {
            color: am5.color(0xf8a4aa)
          }
        ]
      })
    )

    var originSeries = chart.series.push(
      am5map.MapPointSeries.new(root, { idField: 'id' })
    )

    originSeries.bullets.push(function () {
      var circle = am5.Circle.new(root, {
        radius: 5,
        tooltipText: 'From: {title}',
        cursorOverStyle: 'pointer',
        tooltipY: 0,
        fill: am5.color(0x31afea),
        stroke: root.interfaceColors.get('background'),
        strokeWidth: 0
      })

      circle.events.on('click', function (e) {
        selectOrigin(e.target.dataItem.get('id'))
      })

      return am5.Bullet.new(root, {
        sprite: circle
      })
    })

    var destinationSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {})
    )

    destinationSeries.bullets.push(function () {
      var circle = am5.Circle.new(root, {
        radius: 5,
        tooltipText: '{title}',
        tooltipY: 0,
        fill: am5.color(0x657a8f),
        stroke: root.interfaceColors.get('background'),
        strokeWidth: 0
      })

      circle.events.on('click', function (e) {
        history.push(
          basePath + '/r/' + e.target.dataItem.dataContext.qid + queryString
        )
      })

      return am5.Bullet.new(root, {
        sprite: circle
      })
    })

    originSeries.data.setAll(originCities)
    destinationSeries.data.setAll(destinationCities)

    function selectOrigin (id) {
      currentId = id
      var dataItem = originSeries.getDataItemById(id)
      var dataContext = dataItem.dataContext
      chart.zoomToGeoPoint(dataContext.zoomPoint, dataContext.zoomLevel, true)

      var destinations = dataContext.destinations
      var lineSeriesData = []
      var originLongitude = dataItem.get('longitude')
      var originLatitude = dataItem.get('latitude')

      am5.array.each(destinations, function (did) {
        var destinationDataItem = destinationSeries.getDataItemById(did)
        if (!destinationDataItem) {
          destinationDataItem = originSeries.getDataItemById(did)
        }
        lineSeriesData.push({
          geometry: {
            type: 'LineString',
            coordinates: [
              [originLongitude, originLatitude],
              [
                destinationDataItem.get('longitude'),
                destinationDataItem.get('latitude')
              ]
            ]
          }
        })
      })
      lineSeries.data.setAll(lineSeriesData)
    }
    var currentId = originCities[0].id

    destinationSeries.events.on('datavalidated', function () {
      selectOrigin(currentId)
    })

    // Make stuff animate on load
    chart.appear(1000, 100)
    chartRef.current = chart
    return () => {
      root.dispose()
    }
  }, [])

  return (
    <div>
      <div id='chartdiv' style={{ height: `calc(50vh)` }}></div>
    </div>
  )
}

export default SvgMap
