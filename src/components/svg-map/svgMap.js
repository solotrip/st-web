import React, { useEffect } from 'react'

import { useHistory } from 'react-router'

import * as am5 from '@amcharts/amcharts5'
import * as am5map from '@amcharts/amcharts5/map'
import * as am5Theme from '@amcharts/amcharts5/themes/Responsive'
import worldGeodata from '@amcharts/amcharts5-geodata/worldLow'

import useThemeState from 'utils/hooks/use-theme-state'
import styles from './svgmap.module.scss'
import MapSkeleton from './mapSkeleton'

const SvgMap = ({
  originCities,
  destinationCities,
  halfHeight,
  DOMroot = 'chartdiv',
  detailsOpenable = true,
  loading,
  ignoreBoundaries = false
}) => {
  const history = useHistory()
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

  const borderColor = am5.color(0x3cafeb)

  const landColor =
    appTheme === 'dark'
      ? am5.color(0x181d26)
      : appTheme === 'light'
      ? am5.color(0x667a8e)
      : appTheme === 'no-preference'
      ? am5.color(0x181d26)
      : am5.color(0x667a8e)

  useEffect(
    () => {
      if (loading) return
      let root = am5.Root.new(DOMroot)
      root.setThemes(am5Theme)
      let chart = root.container.children.push(
        am5map.MapChart.new(root, {
          projection: am5map.geoMercator()
        })
      )

      let polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, { geoJSON: worldGeodata })
      )

      let backgroundSeries = chart.series.unshift(
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
      polygonSeries.mapPolygons.template.setAll({
        fill: landColor
      })

      let lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}))
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

      let originSeries = chart.series.push(
        am5map.MapPointSeries.new(root, { idField: 'id' })
      )

      originSeries.bullets.push(function () {
        let circle = am5.Circle.new(root, {
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

      let destinationSeries = chart.series.push(
        am5map.MapPointSeries.new(root, {})
      )

      let circleTemplate = am5.Template.new({})
      destinationSeries.bullets.push(function (root) {
        let bulletContainer = am5.Container.new(root, {})
        let circle = bulletContainer.children.push(
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

        let maskCircle = bulletContainer.children.push(
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
        let imageContainer = bulletContainer.children.push(
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

        let image = imageContainer.children.push(
          am5.Picture.new(root, {
            templateField: 'pictureSettings',
            centerX: am5.p50,
            centerY: am5.p50,
            width: 60,
            height: 60
          })
        )

        const openLink = e => {
          history.push(e.target.dataItem.dataContext.link)
        }

        if (detailsOpenable) {
          maskCircle.events.on('click', openLink)
          image.events.on('click', openLink)
          imageContainer.events.on('click', openLink)
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
        let dataItem = originSeries.getDataItemById(id)
        let dataContext = dataItem.dataContext
        chart.zoomToGeoPoint(dataContext.zoomPoint, dataContext.zoomLevel, true)

        let destinations = dataContext.destinations

        let originLongitude = dataItem.get('longitude')
        let originLatitude = dataItem.get('latitude')

        const lineSeriesData = am5.array.map(destinations, did => {
          const destinationDataItem =
            destinationSeries.getDataItemById(did) ||
            originSeries.getDataItemById(did)
          return {
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
          }
        })
        lineSeries.data.setAll(lineSeriesData)
      }

      let currentId = originCities[0].id

      destinationSeries.events.on('datavalidated', function () {
        selectOrigin(currentId)
      })

      // Make stuff animate on load
      chart.appear(1000, 100)
      return () => {
        root.dispose()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [DOMroot]
  )

  if (loading) return <MapSkeleton />

  return <div id={DOMroot} className={styles.content} />
}

export default SvgMap
