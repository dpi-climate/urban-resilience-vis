import Map from "./Map"
import MapSlider from "../slider/MapSlider"
import { useState } from "react"
import MyLineChart from "../line-chart/LineChart"

interface MapWrapperProps {
  mainLayersIds: string[]
}

const MapWrapper: React.FC<MapWrapperProps> = (props) => {

  const [timeStamp, setTimeStamp] = useState(0)
  const [showChart, setShowChart] = useState(false)
  const [fillOpacity, setFillOpacity] = useState(0.5)
  const [strokeOpacity, setStrokeOpacity] = useState(1)

  return (
    <>
      <MyLineChart visible={showChart} setVisible={setShowChart}/>
      <Map mainLayersIds={props.mainLayersIds} timeStamp={timeStamp} onClick={setShowChart} fillOpacity={fillOpacity} strokeOpacity={strokeOpacity}/>
      <MapSlider value={timeStamp} onChange={setTimeStamp}/>
    </>
  )


}

export default MapWrapper
