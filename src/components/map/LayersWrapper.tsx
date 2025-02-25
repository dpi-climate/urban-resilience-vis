import { useRef, useState, useEffect, useCallback } from "react"
import { MapboxOverlay } from "@deck.gl/mapbox"
import { Layer } from "@deck.gl/core"

// import buildScatterLayer from "./scatterLayer"
import buildPolygonLayer from "./polygonLayer"

interface ILayersWrapper {
  map: mapboxgl.Map
  mainLayersIds: string[]
  timeStamp: number
}

const LayersWrapper = (props: ILayersWrapper) => {

  const overlayRef = useRef<MapboxOverlay | null>(null)
  const [layers, setLayers] = useState<Layer[]>([])

  
  // const buildLayers = useCallback(() => {

  //   ;(async () => {
  //     const scatterLayer = buildScatterLayer()
  //     const response = await fetch("./src/assets/no2_wrf_ct.geojson")

  //     const polygonLayer = buildPolygonLayer(response.json());
  //     const layersArr: Layer[] = [scatterLayer, polygonLayer]

  //     setLayers(layersArr)

  //   })()
  // },[])

  const buildLayers = useCallback(() => {

    ;(async () => {
      const layersArr: Layer[] = []

      for (let i = 0; i < props.mainLayersIds.length; i++) {
        const response = await fetch(`./src/assets/${props.mainLayersIds[i]}_wrf_ct.json`)
        const data = response.json()
        const polygonLayer = buildPolygonLayer(data, props.mainLayersIds[i], props.timeStamp)
        layersArr.push(polygonLayer)
      }


      setLayers(layersArr)

    })()
  },[props.mainLayersIds, props.timeStamp])

  const loadLayers = useCallback(() => {
    if (!props.map) return
    
    if (!overlayRef.current) {
        overlayRef.current = new MapboxOverlay({
        layers,
      })
      
      props.map.addControl(overlayRef.current as unknown as mapboxgl.IControl)
    }

    if (overlayRef.current) {
      overlayRef.current.setProps({ layers })
    }

    return () => {
      // If you want to remove the control completely when the component unmounts:
      // if (overlayRef.current) {
      //   map.removeControl(overlayRef.current as unknown as mapboxgl.IControl)
      // }
    }

  },[props.map, layers])

  useEffect(() => buildLayers(), [buildLayers])
  useEffect(() => loadLayers(), [loadLayers])
    
  return null
}

export default LayersWrapper