import { useRef, useState, useEffect } from "react"
import { MapboxOverlay } from "@deck.gl/mapbox"
import { Layer } from "@deck.gl/core"

// import buildGridLayer from "./gridLayer"
import buildPolygonLayer from "./polygonLayer"
import buildVectorLayer from "./windLayer"
import buildScatterLayer from "./scatterLayer"
import buildRasterTileLayer from "./tyleLayer"
import buildRouteLayer from "./routeLayer"

import { TSpatialLevel } from "../../types-and-interfaces/types"
import { spatialLevels } from "../../utils/spatial-levels"
import { findFieldById } from "../../utils/support"

import mapboxgl from "mapbox-gl"

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string

interface ILayersWrapper {
  map: mapboxgl.Map
  spatialLevel: TSpatialLevel
  fieldIds: string[]
  timeStamp: number
  handleClick: any
  fillOpacity: number
  strokeOpacity: number
  selectedFeature: any
  route: any
  routePoints: number[][]
}

const LayersWrapper = (props: ILayersWrapper) => {

  const overlayRef = useRef<MapboxOverlay | null>(null)
  const [fetchedData, setFetchedData] = useState<Record<string, any>>({})
  const [layers, setLayers] = useState<Layer[]>([])

  const [fetchedRoute, setFetchedRoute] = useState<Record<string, any>>({})

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

        if(field) {
          if(field.layerType === "multiple") {
            for (const level of circularLevels) {
              try {
                const response = await fetch(`./src/assets/${level}_${id}.geojson`)
                console.log(`${level}_${id}.geojson`)
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
              dataMap[id] = {}
            }

          } else {
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
            if (!fileFound) {
              console.error(`No file found for field id ${id}.`)
              dataMap[id] = {}
            }
          }
        }
      }
      
      // setFetchedData(dataMap)
      setFetchedData(prevFetchedData => {
        if("route" in prevFetchedData) {
          dataMap["route"] = prevFetchedData["route"]
        }
        return dataMap
      })
    }

    fetchData()
  }, [props.fieldIds, props.spatialLevel])

  // Fetch Route
  useEffect(() => {
    const fetchRoute = async () => {
      if(props.routePoints.length <= 1) {
        setFetchedData((prevFetchedData) => {
          const { route, ...rest } = prevFetchedData;
          return rest
        })
        
        return
      }

      try {
        const coordsString = props.routePoints
          .map((coord) => `${coord[0]},${coord[1]}`)
          .join(";")

        const query = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordsString}?geometries=geojson&overview=full&access_token=${mapboxgl.accessToken}`;
        const response = await fetch(query)
        const data = await response.json()
        if (data.routes && data.routes.length > 0) {
          const routeGeoJson = data.routes[0].geometry
          setFetchedData((prevFetchedData) => ({ ...prevFetchedData, "route": routeGeoJson }))
        }
      } catch (error) {
        console.error('Error fetching route:', error)
      }
    }

    fetchRoute()

  },[props.routePoints])

  // Build Layers
  useEffect(() => {
    if (props.fieldIds.every(id => fetchedData[id])) {
      const layersArr: Layer[] = props.fieldIds.map(id => {
        const field = findFieldById(id)
        
        if(field?.layerType === "vector") {
          return buildVectorLayer(
            fetchedData[id].data,
            props.timeStamp,
            props.spatialLevel,
            props.fillOpacity,
          )

        } else {
          if(fetchedData[id].level === "pt") {
            return buildRasterTileLayer(
              props.timeStamp,
              id,
              props.fillOpacity,
            )
            // return buildGridLayer(
            //   fetchedData[id].data,
            //   id,
            //   props.timeStamp,
            //   props.handleClick,
            //   props.fillOpacity,
            // )
          } else if (fetchedData[id].type === "scatter") {
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

      if("route" in fetchedData) {
        layersArr.push(buildRouteLayer(fetchedData.route))
      }

      // layersArr.push(buildVectorLayer())

      setLayers(layersArr)
    }

  }, [fetchedData, props.fieldIds, props.timeStamp, props.handleClick, props.fillOpacity, props.strokeOpacity, props.spatialLevel])

  // Load Layers
  useEffect(() => {
    if (!props.map) return

    if (!overlayRef.current) {
      overlayRef.current = new MapboxOverlay({ layers })
      props.map.addControl(overlayRef.current as mapboxgl.IControl)


    } else {
      overlayRef.current.setProps({ layers })
    }

    return () => {}

  }, [props.map, layers, ])

  return null
}

export default LayersWrapper