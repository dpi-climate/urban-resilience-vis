import { useRef, useState, useEffect } from "react"
import { MapboxOverlay } from "@deck.gl/mapbox"
import { Layer } from "@deck.gl/core"

import buildScatterLayer from "./scatterLayer"
import buildPolygonLayer from "./polygonLayer"
import buildIconLayer from "./windLayer"

import { TSpatialLevel } from "../../types-and-interfaces/types"
import { spatialLevels } from "../../utils/spatial-levels"
import { findFieldById } from "../../utils/support"

interface ILayersWrapper {
  map: mapboxgl.Map
  spatialLevel: TSpatialLevel
  fieldIds: string[]
  timeStamp: number
  handleClick: any
  fillOpacity: number
  strokeOpacity: number
  selectedFeature: any
}

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

        const field = findFieldById(id)

        if (field?.layerType !== "multiple") {
          try {
            const response = await fetch(`./src/assets/${id}.geojson`)

            if (response.ok) {
              const jsonData = await response.json()
              dataMap[id] = { data: jsonData, level: null, type: field?.layerType }
              fileFound = true
              break
            }
          } catch (error) {
            // Log error if needed, or simply try the next level
            console.error(`Error fetching file for ${id}:`, error)
          }
          
        }
        else {
          for (const level of circularLevels) {
            try {
              const response = await fetch(`./src/assets/${level}_${id}.geojson`)
  
              if (response.ok) {
                const jsonData = await response.json()
                dataMap[id] = { data: jsonData, level, type: null }
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
      }
      
      setFetchedData(dataMap)
    }

    fetchData()
  }, [props.fieldIds, props.spatialLevel])

  // Build Layers
  useEffect(() => {
    if (props.fieldIds.every(id => fetchedData[id])) {
      const layersArr: Layer[] = props.fieldIds.map(id => {
        const field = findFieldById(id)
        console.log()
        if(field?.layerType === "windLayer") {
          return buildIconLayer(
            fetchedData[id].data,
            props.timeStamp,
          )

        } else {
          if(fetchedData[id].level === "pt") {
            return buildScatterLayer(
              fetchedData[id].data,
              id,
              props.timeStamp,
              props.handleClick,
              props.fillOpacity,
            )
          } else {
            return buildPolygonLayer(
              fetchedData[id].data,
              id,
              props.timeStamp,
              props.handleClick,
              props.fillOpacity,
              props.strokeOpacity,
              props.selectedFeature,
            )
          }
        }
      })

      // layersArr.push(buildIconLayer())

      setLayers(layersArr)
    }
  }, [fetchedData, props.fieldIds, props.timeStamp, props.handleClick, props.fillOpacity, props.strokeOpacity, props.spatialLevel])

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