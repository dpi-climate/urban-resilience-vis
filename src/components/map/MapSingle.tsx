import "./Map.css"

import { useRef, useState, useEffect } from "react"

import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

import LayersWrapper from "../layer-wrapper/LayersWrapper"

import { TSpatialLevel } from "../../types-and-interfaces/types"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"

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
  
  const [routePoints, setRoutePoints] = useState<number[][]>([])
  const [route, setRoute] = useState(null)

  const [origin, setOrigin] = useState<[number, number] | null>(null)
  const [destination, setDestination] = useState<[number, number] | null>(null)

  // Start Map
  useEffect(() => {
    if (!mapContainerRef.current) return

    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard-satellite", //"mapbox://styles/carolvfs/clxnzay8z02qh01qkhftqheen" , 
      center: [-89.129879, 40.092361],
      // center: [-122.4, 37.74],
      zoom: 6,
      projection: 'mercator'
      // minZoom: 6
    })

    // mapInstance.on("load", () => {
    //   if(!mapInstance.getSource('mapbox-dem')) {
    //     mapInstance.addSource('mapbox-dem', {
    //       type: 'raster-dem',
    //       url: 'mapbox://mapbox.terrain-rgb',
    //       tileSize: 512,
    //       maxzoom: 14,
    //     })
    
    //     mapInstance.setTerrain({ source: 'mapbox-dem', exaggeration: 1 })
    //   }
    // })

    mapInstance.on("zoom", () => {
      setCurrentZoom(mapInstance.getZoom())
    })

    setMap(mapInstance)

    return () => mapInstance.remove()

  },[])

  useEffect(() => {
    if (!map) return
  
    const originGeocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      placeholder: "Origin",
      mapboxgl,
      flyTo: false,
    })
    const destGeocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      placeholder: "Destination",
      mapboxgl,
      flyTo: false,
    })
  
    originGeocoder.on("result", (e) => {
      setOrigin(e.result.center as [number, number])
    })
    destGeocoder.on("result", (e) => {
      setDestination(e.result.center as [number, number])
    })
  
    originGeocoder.on("clear", () => {
      setOrigin(null)
    })
    destGeocoder.on("clear", () => {
      setDestination(null)
    })
  
    map.addControl(originGeocoder, "top-left")
    map.addControl(destGeocoder, "top-left")
  
    return () => {
      map.removeControl(originGeocoder)
      map.removeControl(destGeocoder)
    }
  }, [map])
  

  useEffect(() => {
    console.log(origin, destination)
    if(origin && destination) {
      setRoutePoints([origin, destination])
    } else {
      setRoutePoints([])
    }

  },[origin, destination])

  useEffect(() => {
    if (!map) return

    const handleMapClick = (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
      const coords = [e.lngLat.lng, e.lngLat.lat]

      setRoutePoints(prevRoutePoints => {
        const newRoutePoints = prevRoutePoints.length < 25 
          ? [...prevRoutePoints, coords]
          : prevRoutePoints
        if (prevRoutePoints.length == 25) {
          console.log("Requests using this profile accept up to 25 coordinates.")
        }
        return newRoutePoints
      })
    }

    map.on("click", handleMapClick)

    return () => {
      map.off("click", handleMapClick)
    }
  }, [map]) 

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
          routePoints={routePoints}
          route={route} // should be [locationA, locationB] // actually, should accept multiple points that define a route 
          // Requests using this profile accept up to 25 coordinates.
          // https://api.mapbox.com/directions/v5/{profile}/{coordinates}
          // profile: The routing profile to use. Possible values are mapbox/driving-traffic, mapbox/driving, mapbox/walking, or mapbox/cycling.
          // coordinates: A semicolon-separated list of between two and 25 {longitude},{latitude} coordinate pairs to visit in order.
          // https://docs.mapbox.com/api/navigation/directions/
        />}
    </div>
  )

}

export default Map