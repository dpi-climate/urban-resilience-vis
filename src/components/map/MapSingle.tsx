import "./Map.css"

import { useRef, useState, useEffect } from "react"

import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

import LayersWrapper from "../layer-wrapper/LayersWrapper"

import { TSpatialLevel } from "../../types-and-interfaces/types"

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string

interface IMapProps {
  fieldIds: string[]
  timeStamp: number
  setLocalData: any
  handleClick: any
  fillOpacity: number
  strokeOpacity: number
  selectedFeature: any
}


const Map: React.FC<IMapProps> = (props) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  
  const [map, setMap] = useState<mapboxgl.Map | null>(null)
  const [currentZoom, setCurrentZoom] = useState<number>(6)
  const [spatialLevel, setSpatialLevel] = useState<TSpatialLevel>("pt")

  // Start Map
  useEffect(() => {
    if (!mapContainerRef.current) return

    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard-satellite",//"mapbox://styles/carolvfs/clxnzay8z02qh01qkhftqheen" ,
      center: [-89.129879, 40.092361],
      zoom: 6,
      // minZoom: 6
    })

    mapInstance.on("zoom", () => {
      setCurrentZoom(mapInstance.getZoom())
    })

    setMap(mapInstance)

    return () => mapInstance.remove()

  },[])

  // Update Spatial Level
  useEffect(() => {
    ;(async () => {
      try {

        let newSpatialLevel: TSpatialLevel = "bg"

        if (currentZoom < 6.6) {
          newSpatialLevel = "pt"
        
        } else if (currentZoom < 7.8){
          newSpatialLevel = "co"
        
        } else if(currentZoom < 10) {

          newSpatialLevel = "ct"
        
        } else if(currentZoom < 12) {
          newSpatialLevel = "bg"
        }

        if(newSpatialLevel !== spatialLevel) {
          setSpatialLevel(newSpatialLevel)
          props.setLocalData({})

        }

      } catch (error) {
        console.error("Error fetching polygon data:", error)
      }
    })()


  },[currentZoom, spatialLevel])

  
  return (
    <div className="map-container" ref={mapContainerRef}>
      {map && 
        <LayersWrapper 
          map={map} 
          spatialLevel={spatialLevel}
          fieldIds={props.fieldIds} 
          timeStamp={props.timeStamp}
          fillOpacity={props.fillOpacity} 
          strokeOpacity={props.strokeOpacity}
          selectedFeature={props.selectedFeature}
          handleClick={props.handleClick} 

        />}
    </div>
  )

}

export default Map