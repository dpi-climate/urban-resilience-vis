import { useRef, useState, useEffect } from "react"
import { MapboxOverlay } from "@deck.gl/mapbox"
import { Layer } from "@deck.gl/core"

import buildScatterLayer from "./scatterLayer"
import buildPolygonLayer from "./polygonLayer"

import { TSpatialLevel } from "../../types-and-interfaces/types"

import { spatialLevels } from "../../utils/spatial-levels"

interface ILayersWrapper {
  map: mapboxgl.Map
  spatialLevel: TSpatialLevel
  fieldIds: string[]
  timeStamp: number
  onClick: any
  fillOpacity: number
  strokeOpacity: number
}

// const spatialLevels = ["pt", "co", "ct", "bg"]

const LayersWrapper = (props: ILayersWrapper) => {

  const overlayRef = useRef<MapboxOverlay | null>(null)
  const [fetchedData, setFetchedData] = useState<Record<string, any>>({})
  const [layers, setLayers] = useState<Layer[]>([])

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      const dataMap: Record<string, any> = {}

      const startIndex = spatialLevels.indexOf(props.spatialLevel)

      if (startIndex === -1) {
        console.error("Invalid spatial level:", props.spatialLevel)
        return
      }

      const circularLevels = spatialLevels.slice(startIndex).concat(spatialLevels.slice(0, startIndex))
      
      for (const id of props.fieldIds) {
        let fileFound = false

        for (const level of circularLevels) {
          try {
            const response = await fetch(`./src/assets/${level}_${id}.geojson`)

            if (response.ok) {
              const jsonData = await response.json()
              dataMap[id] = { data: jsonData, level }
              fileFound = true
              break
            }
          } catch (error) {
            // Log error if needed, or simply try the next level
            console.error(`Error fetching file for ${level}_${id}:`, error)
          }
        }

        if (!fileFound) {
          console.error(`No file found for field id ${id} with any spatial level.`)
        }

      }
      
      setFetchedData(dataMap)
    }

    fetchData()
  }, [props.fieldIds, props.spatialLevel])

  // Build Layers
  useEffect(() => {
    if (props.fieldIds.every(id => fetchedData[id])) {
      const layersArr: Layer[] = props.fieldIds.map(id => {

        if(fetchedData[id].level === "pt") {
          return buildScatterLayer(
            fetchedData[id].data,
            id,
            props.timeStamp,
            props.onClick,
            props.fillOpacity,
            props.strokeOpacity
          )
        } else {
          console.log(fetchedData[id].data)
          return buildPolygonLayer(
            fetchedData[id].data,
            id,
            props.timeStamp,
            props.onClick,
            props.fillOpacity,
            props.strokeOpacity
          )
        }
      })

      setLayers(layersArr)
    }
  }, [fetchedData, props.fieldIds, props.timeStamp, props.onClick, props.fillOpacity, props.strokeOpacity, props.spatialLevel])

  // Load Layers
  useEffect(() => {
    if (!props.map) return

    if (!overlayRef.current) {
      overlayRef.current = new MapboxOverlay({ layers })
      props.map.addControl(overlayRef.current as unknown as mapboxgl.IControl)
    } else {
      overlayRef.current.setProps({ layers })
    }
  }, [props.map, layers])

  return null
}

export default LayersWrapper