import React, { Component, useState, useRef, useLayoutEffect } from 'react'

import { useHistory } from 'react-router'

import * as am5 from '@amcharts/amcharts5'
import * as am5map from '@amcharts/amcharts5/map'
import * as am5themes_Animated from '@amcharts/amcharts5/themes/Frozen'
import am5geodata_world from '@amcharts/amcharts5-geodata/worldLow'

var imageSize = 34
const SvgMap = ({
  originCities,
  destinationCities,
  queryString,
  basePath,
  contentType = 'recommendations',
  DOMroot = 'chartdiv',
  detailsOpenable = true
}) => {
  const history = useHistory()
  const chartRef = useRef(null)

  useLayoutEffect(() => {
    var root = am5.Root.new(DOMroot)
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

    var circleTemplate = am5.Template.new({})
    destinationSeries.bullets.push(function (root, series, dataItem) {
      var bulletContainer = am5.Container.new(root, {})
      var circle = bulletContainer.children.push(
        am5.Circle.new(
          root,
          {
            radius: am5.p50,
            tooltipText: '{title}',
            tooltipY: 0
          },
          circleTemplate
        )
      )

      circle.states.create('hover', {
        scale: 2,
        stateAnimationDuration: 10
      })

      circle.states.create('default', {
        showTooltipOn: 'always',
        tooltipText: '{title}',
        tooltipY: 0
      })

      var maskCircle = bulletContainer.children.push(
        am5.Circle.new(root, {
          radius: 20,
          tooltipText: '{title}',
          tooltipY: 0,
          fill: am5.color(0x657a8f),
          stroke: am5.color(0x12c2e9),
          strokeGradient: am5.LinearGradient.new(root, {
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
          }),
          strokeWidth: 2
        })
      )
      circle.states.create('default', {
        showTooltipOn: 'always',
        tooltipText: '{title}',
        tooltipY: 0
      })

      // only containers can be masked, so we add image to another container
      var imageContainer = bulletContainer.children.push(
        am5.Container.new(root, {
          mask: maskCircle,
          tooltipText: '{title}',
          tooltipY: 0,
          fill: am5.color(0x657a8f)
        })
      )
      imageContainer.states.create('hover', {
        scale: 2.5,
        stateAnimationDuration: 10
      })

      var image = imageContainer.children.push(
        am5.Picture.new(root, {
          templateField: 'pictureSettings',
          centerX: am5.p50,
          centerY: am5.p50,
          width: 60,
          height: 60
        })
      )

      if (detailsOpenable) {
        maskCircle.events.on('click', function (e) {
          history.push(
            basePath + '/r/' + e.target.dataItem.dataContext.qid + queryString
          )
        })
        image.events.on('click', function (e) {
          history.push(
            basePath + '/r/' + e.target.dataItem.dataContext.qid + queryString
          )
        })
        imageContainer.events.on('click', function (e) {
          history.push(
            basePath + '/r/' + e.target.dataItem.dataContext.qid + queryString
          )
        })
      }

      return am5.Bullet.new(root, {
        locationY: 0,
        sprite: bulletContainer
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
  }, [contentType])

  return (
    <div>
      <div
        id={DOMroot}
        style={
          contentType === 'recommendations'
            ? { height: `calc(50vh)` }
            : { height: `calc(100vh)` }
        }
      ></div>
    </div>
  )
}

export default SvgMap
