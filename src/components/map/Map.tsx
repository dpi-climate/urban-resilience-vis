import "./Map.css"

import { useRef, useState, useEffect, useCallback } from "react"

import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

import LayersWrapper from "./LayersWrapper"

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string

interface IMapProps {
  mainLayersIds: string[]
  timeStamp: number
}


const Map: React.FC<IMapProps> = (props) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  
  const [map, setMap] = useState<mapboxgl.Map | null>(null)

  const startMap = useCallback(() => {
    if (!mapContainerRef.current) return

    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard-satellite",//"mapbox://styles/mapbox/navigation-day-v1", //"mapbox://styles/carolvfs/clxnzay8z02qh01qkhftqheen" ,//
      // center: [-89.129879, 40.092361] as [number, number],
      center: [-89.129879, 40.092361],
      zoom: 6,
      minZoom: 6
    })

    // mapInstance.on("zoom", () => {
    //   setCurrentZoom(mapInstance.getZoom())
    // })

    setMap(mapInstance)

    return () => mapInstance.remove()

  },[])

  useEffect(() => startMap(), [startMap])

  
  return (
    <div className="map-container" ref={mapContainerRef}>
      {map && <LayersWrapper map={map} mainLayersIds={props.mainLayersIds} timeStamp={props.timeStamp}/>}
    </div>
  )

}

export default Map