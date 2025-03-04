import "./Map.css"
import React, { useRef, useState, useEffect, useCallback } from "react"

import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import LayersWrapper from "../layer-wrapper/LayersWrapper"
import { TSpatialLevel } from "../../types-and-interfaces/types"

interface IMapSideBySide {
  mainLayersIds: string[]
  secondLayersIds: string[]
  timeStamp: number
  setLocalData: any
  handleClick: any
  fillOpacity: number
  strokeOpacity: number
  selectedFeature: any
}

const MapSideBySide: React.FC<IMapSideBySide> = (props) => {

  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const beforeRef = useRef<HTMLDivElement | null>(null)
  const afterRef = useRef<HTMLDivElement | null>(null)

  const [beforeMap, setBeforeMap] = useState<mapboxgl.Map | null>(null)
  const [afterMap, setAfterMap] = useState<mapboxgl.Map | null>(null)

  const [activeMap, setActiveMap] = useState<'before' | 'after' | null>(null)

  const [center, setCenter] = useState<mapboxgl.LngLat>(new mapboxgl.LngLat(0, 0))
  const [zoom, setZoom] = useState<number>(0)

  const [spatialLevel, setSpatialLevel] = useState<TSpatialLevel>("pt")

  const onMove = useCallback((center:any, zoom:number) => {setCenter(center); setZoom(zoom)}, [])

  useEffect(() => {
    if (!mapContainerRef.current || !beforeRef.current || !afterRef.current) return
   
    const before = new mapboxgl.Map({
      container: beforeRef.current,
      style: "mapbox://styles/mapbox/standard-satellite",//'mapbox://styles/mapbox/light-v11',
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

    return () =>{
      before.remove()
      after.remove()
    
    }

},[])

useEffect(() => {

  if(!beforeMap || !afterMap) return

  beforeMap.on("movestart", (e:any) => { 
    if(e.originalEvent instanceof MouseEvent) {
      // console.log("before started")
      const _center = beforeMap.getCenter()
      const _zoom = beforeMap.getZoom()
      // console.log("activeMap === before", "before is moving")
      onMove(_center, _zoom)
      setActiveMap('before')
    
    }
  
  })
  afterMap.on("movestart", (e:any) => { 
    if(e.originalEvent instanceof MouseEvent) {
      // console.log("after started")
      const _center = afterMap.getCenter()
      const _zoom = afterMap.getZoom()
      // console.log("activeMap === right", "after is moving")
      onMove(_center, _zoom)
      setActiveMap('after')
    }
  })

  
  beforeMap.on("moveend", (e:any) => { if(e.originalEvent instanceof MouseEvent) {console.log("before ended"); setActiveMap(null)}})
  afterMap.on("moveend", (e:any) => { if(e.originalEvent instanceof MouseEvent) {console.log("after ended"); setActiveMap(null)}})


},[beforeMap, afterMap])

useEffect(() => {

  if(!beforeMap || !afterMap) return

  beforeMap.on("move", () => {
    if(activeMap === "before") {
      const _center = beforeMap.getCenter()
      const _zoom = beforeMap.getZoom()
      console.log("activeMap === before", "before is moving")
      onMove(_center, _zoom)
    } 
  })

  afterMap.on("move", () => {
    if(activeMap === "after") {
      const _center = afterMap.getCenter()
      const _zoom = afterMap.getZoom()
      console.log("activeMap === after", "after is moving")
      onMove(_center, _zoom)
    } 
  })

},[beforeMap, afterMap, activeMap])

useEffect(() => {

  if(!beforeMap || !afterMap) return

  if(activeMap === 'before') {
    // console.log("after is flying")
    afterMap.jumpTo({ center, zoom })

  } else

  if(activeMap === 'after') {
    // console.log("before is flying")
    beforeMap.jumpTo({ center, zoom })
  }

},[beforeMap, afterMap, activeMap, center, zoom])

// Update Spatial Level
  useEffect(() => {
    ;(async () => {
      try {

        let newSpatialLevel: TSpatialLevel = "bg"

        if (zoom < 6.6) {
          newSpatialLevel = "pt"
        
        } else if (zoom < 7.8){
          newSpatialLevel = "co"
        
        } else if(zoom < 10) {

          newSpatialLevel = "ct"
        
        } else if(zoom < 12) {
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


  },[zoom, spatialLevel])

return(
  <div className="map-container" ref={mapContainerRef}>
    <div id="before-map" style={{position: 'absolute', width:"50%", height: '100%', zIndex:1}} ref={beforeRef}></div>
    <div id="after-map" style={{position: 'absolute', left:"50%", width:"50%", height: '100%', zIndex:1}} ref={afterRef}></div>
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

export default MapSideBySide