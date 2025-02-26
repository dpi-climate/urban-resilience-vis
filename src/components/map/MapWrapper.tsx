import Map from "./Map"
import MapCompare from "./MapCompare"
import MapSlider from "../slider/MapSlider"
import { useState } from "react"
import MyLineChart from "../line-chart/LineChart"
import { TMode } from "../../types-and-interfaces/types"

interface MapWrapperProps {
  mainLayersIds: string[]
  mode: TMode
}

const MapWrapper: React.FC<MapWrapperProps> = (props) => {

  const [timeStamp, setTimeStamp] = useState(0)
  const [showChart, setShowChart] = useState(false)
  const [fillOpacity, setFillOpacity] = useState(0.5)
  const [strokeOpacity, setStrokeOpacity] = useState(1)

  const renderMap = () => {
    if(props.mode === "single") {
      return <Map mainLayersIds={props.mainLayersIds} timeStamp={timeStamp} onClick={setShowChart} fillOpacity={fillOpacity} strokeOpacity={strokeOpacity}/>
    
    } else {
      return <MapCompare mainLayersIds={props.mainLayersIds} timeStamp={timeStamp} onClick={setShowChart} fillOpacity={fillOpacity} strokeOpacity={strokeOpacity}/>
    }
  }

  return (
    <>
      <MyLineChart visible={showChart} setVisible={setShowChart}/>
      
      { renderMap() }
      
      <MapSlider value={timeStamp} onChange={setTimeStamp}/>
    </>
  )


}

export default MapWrapper
