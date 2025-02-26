import Map from "./Map"
import MapSlider from "../slider/MapSlider"
import { useState } from "react"

interface MapWrapperProps {
  mainLayersIds: string[]
}

const MapWrapper: React.FC<MapWrapperProps> = (props) => {

  const [timeStamp, setTimeStamp] = useState(0)

  return (
    <>
      <Map mainLayersIds={props.mainLayersIds} timeStamp={timeStamp}/>
      <MapSlider value={timeStamp} onChange={setTimeStamp}/>
    </>


  )


}

export default MapWrapper
