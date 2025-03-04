import { useState } from "react"

import Map from "./MapSingle"
import MapCompare from "./MapSplit"
import MapSideBySide from "./MapSideBySide"

import MapSlider from "../time-slider/TimeSlider"
import MyLineChart from "../line-chart/LineChart"

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
  const [localData, setLocalData] = useState({})
  const [selectedFeature, setSelectedFeature] = useState(null)

  const updateLineChart = (data: any) => {
    // Temporal data
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key, ]) => !Number.isNaN(Number(key)))
    )

    if(Object.keys(filteredData).length > 0) {
      setLocalData(filteredData)
      setShowChart(true)
    }
  }

  const renderMap = () => {
    if(props.mode === "single") {
      return <Map 
              fieldIds={props.mainLayersIds} 
              timeStamp={timeStamp} 
              fillOpacity={props.fillOpacity} 
              strokeOpacity={props.strokeOpacity}
              setLocalData={setLocalData}
              handleClick={updateLineChart}
              selectedFeature={selectedFeature}
              setSelectedFeature={setSelectedFeature}
              />
    
    } else if (props.mode === "side-by-side") {
      return <MapSideBySide 
                mainLayersIds={props.mainLayersIds} 
                secondLayersIds={props.secondLayersIds}
                timeStamp={timeStamp} 
                fillOpacity={props.fillOpacity} 
                strokeOpacity={props.strokeOpacity}
                setLocalData={setLocalData}
                handleClick={updateLineChart}
              />
      
    } else if (props.mode === "split") {
      return <MapCompare 
                mainLayersIds={props.mainLayersIds} 
                secondLayersIds={props.secondLayersIds}
                timeStamp={timeStamp} 
                fillOpacity={props.fillOpacity} 
                strokeOpacity={props.strokeOpacity}
                setLocalData={setLocalData}
                handleClick={updateLineChart} 
                />
    }
  }

  return (
    <>
      <MyLineChart 
        data={localData}
        visible={showChart}
        setVisible={setShowChart}
        timeStamp={timeStamp}
        />
      
      { renderMap() }
            
      <MapSlider value={timeStamp} onChange={setTimeStamp}/>
    </>
  )


}

export default MapWrapper
