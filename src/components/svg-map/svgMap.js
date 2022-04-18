import React, { Component, useState, useRef, useLayoutEffect } from 'react'

import { useHistory } from 'react-router'

import * as am5 from '@amcharts/amcharts5'
import * as am5map from '@amcharts/amcharts5/map'
import * as am5themes_Animated from '@amcharts/amcharts5/themes/Responsive'
import am5geodata_world from '@amcharts/amcharts5-geodata/worldLow'
import ContentLoader from 'react-content-loader'

import useThemeState from 'utils/hooks/use-theme-state'
import styles from './svgmap.module.scss'
var imageSize = 60
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
  const [appTheme] = useThemeState()
  const mapPolygonColor =
    appTheme === 'no-preference'
      ? am5.color(0x181d26)
      : appTheme === 'light'
      ? am5.color(0xf3f3f4)
      : am5.color(0x181d26)

  const maskColor =
    appTheme === 'no-preference'
      ? am5.color(0x657a8f)
      : appTheme === 'light'
      ? am5.color(0x9fc1e0)
      : am5.color(0x657a8f)

  const bgColor =
    appTheme === 'no-preference'
      ? am5.color(0x000000)
      : appTheme === 'light'
      ? am5.color(0xffffff)
      : am5.color(0x000000)

  useLayoutEffect(() => {
    var root = am5.Root.new(DOMroot)
    root.setThemes(am5themes_Animated)
    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        projection: am5map.geoMercator()
      })
    )

    var polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, { geoJSON: am5geodata_world })
    )

    var backgroundSeries = chart.series.unshift(
      am5map.MapPolygonSeries.new(root, {
        width: am5.p100,
        height: am5.p100
      })
    )

    backgroundSeries.mapPolygons.template.setAll({
      fill: bgColor,
      stroke: bgColor,
      width: am5.p100,
      height: am5.p100
    })

    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(180, 360, -180, -360)
    })
    polygonSeries.mapPolygons.template.setAll({ fill: mapPolygonColor })

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
          fill: maskColor,
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
        className={styles.content}
      ></div>
    </div>
  )
}

SvgMap.Skeleton = () => (
  <div className={styles.content2}>
    <ContentLoader
      speed={2}
      width='100%'
      height={565}
      viewBox='0 0 321 565'
      backgroundColor='var(--color-card-bg)'
      foregroundColor='var(--color-highlight-bg)'
    >
      <rect x='4' y='8' rx='4' ry='4' width='40%' height='16' />
      <rect x='4' y='32' rx='3' ry='3' width='60%' height='32' />
      <rect x='80%' y='48' rx='3' ry='3' width='20%' height='16' />
      <rect x='4' y='80' rx='3' ry='3' width='24' height='24' />
      <rect x='10%' y='84' rx='3' ry='3' width='80%' height='16' />
      <rect x='4' y='80' rx='3' ry='3' width='24' height='24' />
      <rect x='10%' y='84' rx='3' ry='3' width='50%' height='16' />
      <rect x='4' y='112' rx='3' ry='3' width='24' height='24' />
      <rect x='10%' y='116' rx='3' ry='3' width='70%' height='16' />
      <rect x='4' y='144' rx='3' ry='3' width='24' height='24' />
      <rect x='10%' y='148' rx='3' ry='3' width='60%' height='16' />
      <rect x='4' y='176' rx='3' ry='3' width='24' height='24' />
      <rect x='10%' y='180' rx='3' ry='3' width='80%' height='16' />
      <rect x='4' y='208' rx='3' ry='3' width='24' height='24' />
      <rect x='10%' y='212' rx='3' ry='3' width='40%' height='16' />
      <rect x='4' y='240' rx='3' ry='3' width='24' height='24' />
      <rect x='10%' y='244' rx='3' ry='3' width='75%' height='16' />
      <rect x='4' y='272' rx='3' ry='3' width='24' height='24' />
      <rect x='10%' y='276' rx='3' ry='3' width='65%' height='16' />
      <rect x='4' y='304' rx='3' ry='3' width='24' height='24' />
      <rect x='10%' y='308' rx='3' ry='3' width='80%' height='16' />
      <rect x='2%' y='340' rx='3' ry='3' width='30%' height='120' />
      <rect x='2%' y='468' rx='3' ry='3' width='30%' height='16' />
      <rect x='34%' y='340' rx='3' ry='3' width='30%' height='120' />
      <rect x='34%' y='468' rx='3' ry='3' width='30%' height='16' />
      <rect x='66%' y='340' rx='3' ry='3' width='30%' height='120' />
      <rect x='66%' y='468' rx='3' ry='3' width='30%' height='16' />
      <rect x='5%' y='510' rx='16' ry='16' width='90%' height='38' />
    </ContentLoader>
  </div>
)

export default SvgMap
