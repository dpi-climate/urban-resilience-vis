import { useRef, useState, useEffect, useCallback } from "react"
import { MapboxOverlay } from "@deck.gl/mapbox"
import { Layer } from "@deck.gl/core"

import buildScatterLayer from "./scatterLayer"
import buildPolygonLayer from "./polygonLayer"


interface ILayersWrapper {
  map: mapboxgl.Map
}

const LayersWrapper = (props: ILayersWrapper) => {

  const overlayRef = useRef<MapboxOverlay | null>(null)
  const [layers, setLayers] = useState<Layer[]>([])

  
  const buildLayers = useCallback(() => {

    ;(async () => {
      const scatterLayer = buildScatterLayer()
      // const response = await fetch("./src/assets/no2_wrf_ct.geojson");
      const response = await fetch("./src/assets/bg_prcp.json");
      const data = await response.json();
      const polygonLayer = buildPolygonLayer(data);
      const layersArr: Layer[] = [scatterLayer, polygonLayer]
      setLayers(layersArr)

    })()
  },[])

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