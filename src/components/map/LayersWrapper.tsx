import { useRef, useState, useEffect, useCallback } from "react"
import { MapboxOverlay } from "@deck.gl/mapbox"
import { Layer } from "@deck.gl/core"

import buildScatterLayer from "./scatterLayer"
import buildPolygonLayer from "./polygonLayer"

interface ILayersWrapper {
  map: mapboxgl.Map
  mainLayersIds: string[]
  timeStamp: number
  onClick: any
  fillOpacity: number
  strokeOpacity: number
}

const LayersWrapper = (props: ILayersWrapper) => {

  const overlayRef = useRef<MapboxOverlay | null>(null)
  const [fetchedData, setFetchedData] = useState<Record<string, any>>({})
  const [layers, setLayers] = useState<Layer[]>([])


  // const buildLayers = useCallback(() => {

  //   ;(async () => {
  //     const response = await fetch("./src/assets/T2_wrf_ct.geojson")
  //     const data = await response.json()

  //     const scatterLayer = buildScatterLayer(data)
  //     const layersArr: Layer[] = [scatterLayer]

  //     setLayers(layersArr)

  //   })()
  // },[])
  
  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      const dataMap: Record<string, any> = {}
      for (let i = 0; i < props.mainLayersIds.length; i++) {
        const id = props.mainLayersIds[i]
        const response = await fetch(`./src/assets/${id}_wrf_ct.json`)
        dataMap[id] = await response.json()
      }
      setFetchedData(dataMap)
    }

    fetchData()
  }, [props.mainLayersIds])

  // Build Layers
  useEffect(() => {
    if (props.mainLayersIds.every(id => fetchedData[id])) {

      
      const layersArr: Layer[] = props.mainLayersIds.map(id => {
        return buildPolygonLayer(
          fetchedData[id],
          id,
          props.timeStamp,
          props.onClick,
          props.fillOpacity,
          props.strokeOpacity
        )
      })
      setLayers(layersArr)
    }
  }, [fetchedData, props.mainLayersIds, props.timeStamp, props.onClick, props.fillOpacity, props.strokeOpacity])

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