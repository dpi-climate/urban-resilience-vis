import "./Map.css"
import React, { useRef, useState, useEffect } from "react"
import mapboxgl from 'mapbox-gl'
import MapboxCompare from "mapbox-gl-compare"
import 'mapbox-gl/dist/mapbox-gl.css'
import "mapbox-gl-compare/dist/mapbox-gl-compare.css"

import LayersWrapper from "../layer-wrapper/LayersWrapper"
import { TSpatialLevel } from "../../types-and-interfaces/types"

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string

interface IMapCompare {
  mainLayersIds: string[]
  secondLayersIds: string[]
  timeStamp: number
  setLocalData: any
  handleClick: any
  fillOpacity: number
  strokeOpacity: number
  selectedFeature: any

}

const MapCompare: React.FC<IMapCompare> = (props) => {

  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const beforeRef = useRef<HTMLDivElement | null>(null)
  const afterRef = useRef<HTMLDivElement | null>(null)

  const [beforeMap, setBeforeMap] = useState<mapboxgl.Map | null>(null)
  const [afterMap, setAfterMap] = useState<mapboxgl.Map | null>(null)

  const [currentZoom, setCurrentZoom] = useState<number>(6)
  const [spatialLevel, setSpatialLevel] = useState<TSpatialLevel>("pt")

  useEffect(() => {
      if (!mapContainerRef.current || !beforeRef.current || !afterRef.current) return
     
      const before = new mapboxgl.Map({
        container: beforeRef.current,
        style: "mapbox://styles/mapbox/standard-satellite", //'mapbox://styles/mapbox/light-v11',
        center: [-89.129879, 40.092361],
        zoom: 6,
      });

      const after = new mapboxgl.Map({
        container: afterRef.current,
        style: "mapbox://styles/mapbox/standard-satellite",//'mapbox://styles/mapbox/dark-v11',
        center: [-89.129879, 40.092361],
        zoom: 6,
      });

      setBeforeMap(before)
      setAfterMap(after)

      const mapInstance = new MapboxCompare(before, after, mapContainerRef.current, {
        // Set this to enable comparing two maps by mouse movement:
        // mousemove: true
      })

      before.on("zoom", () => {
        setCurrentZoom(before.getZoom())
      })
      
      return () =>{
        mapInstance.remove()
        before.remove()
        after.remove()
      
      }
      // mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right')

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

  return(
    <div className="map-container" ref={mapContainerRef}>
      <div id="before-map" style={{position: 'absolute', width:"100%", height: '100%', zIndex:1}} ref={beforeRef}></div>
      <div id="after-map" style={{position: 'absolute', width:"100%", height: '100%', zIndex:1}} ref={afterRef}></div>
      {beforeMap && 
        <LayersWrapper 
          map={beforeMap}
          spatialLevel={spatialLevel}
          fieldIds={props.mainLayersIds} 
          timeStamp={props.timeStamp} 
          handleClick={props.handleClick} 
          fillOpacity={props.fillOpacity} 
          strokeOpacity={props.strokeOpacity}
          selectedFeature={props.selectedFeature}
          />}

      {afterMap && 
        <LayersWrapper 
         map={afterMap} 
         spatialLevel={spatialLevel}
         fieldIds={props.secondLayersIds} 
         timeStamp={props.timeStamp} 
         handleClick={props.handleClick} 
         fillOpacity={props.fillOpacity} 
         strokeOpacity={props.strokeOpacity}
         selectedFeature={props.selectedFeature}
         />}

    </div>
  )
}

export default MapCompare