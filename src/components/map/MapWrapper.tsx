import { useState } from "react"

import { Box } from "@mui/material"
import { Row } from 'react-bootstrap'

import Map from "./MapSingle"
import MapCompare from "./MapSplit"
import MapSideBySide from "./MapSideBySide"

import MapSlider from "../time-slider/TimeSlider"
import ColorBar from "../color-bar/ColorBar"
import MyLineChart from "../line-chart/LineChart"

// import { colors } from '../../utils/colors'
import { TMode } from "../../types-and-interfaces/types"

interface MapWrapperProps {
  mainLayersIds: string[]
  secondLayersIds: string[]
  mode: TMode
  fillOpacity: number
  strokeOpacity: number
}

const MapWrapper: React.FC<MapWrapperProps> = (props) => {

  const [timeStamp, setTimeStamp] = useState(0)
  const [showChart, setShowChart] = useState(false)
  // const [fillOpacity, setFillOpacity] = useState(0.5)
  // const [strokeOpacity, setStrokeOpacity] = useState(1)

  const renderMap = () => {
    if(props.mode === "single") {
      return <Map 
              mainLayersIds={props.mainLayersIds} 
              timeStamp={timeStamp} 
              fillOpacity={props.fillOpacity} 
              strokeOpacity={props.strokeOpacity}
              onClick={setShowChart} 
              />
    
    } else if (props.mode === "side-by-side") {
      return <MapSideBySide 
                mainLayersIds={props.mainLayersIds} 
                secondLayersIds={props.secondLayersIds}
                timeStamp={timeStamp} 
                fillOpacity={props.fillOpacity} 
                strokeOpacity={props.strokeOpacity}
                onClick={setShowChart}
              />
      
    } else if (props.mode === "split") {
      return <MapCompare 
                mainLayersIds={props.mainLayersIds} 
                secondLayersIds={props.secondLayersIds}
                timeStamp={timeStamp} 
                fillOpacity={props.fillOpacity} 
                strokeOpacity={props.strokeOpacity}
                onClick={setShowChart} 
                />
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
