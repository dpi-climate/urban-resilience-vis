import "./Home.css"
import MapWrapper from "../../components/map/MapWrapper"
import DrawerWrapper from "../../components/drawer/DrawerWrapper"

import LayerSelector from "../../components/layer-selector/LayerSelector"
import ModeSelector from "../../components/mode-selector/ModeSelector"
import OpacitySelector from "../../components/opacity-selector/OpacitySelector"

import { Divider } from "@mui/material"
import { useState } from "react"
import { TMode } from "../../types-and-interfaces/types"

const Home = () => {

  const [mode, setMode] = useState<TMode>("single")
  const [mainLayersIds, setMainLayersIds] = useState<string[]>([])
  const [secondLayersIds, setSecondLayersIds] = useState<string[]>([])
  const [fillOpacity, setFillOpacity] = useState(1)
  const [strokeOpacity, setStrokeOpacity] = useState(0.5)

  const handleChangeMode = (m: TMode) => {
    setMode(m)

    if(mode !== "single") {
      if(m === "single") {
        setMainLayersIds([])
        setSecondLayersIds([])
      }
    } else if(m !== "single") {
      setMainLayersIds([])
      setSecondLayersIds([])
    }
  }

  const renderMenu = () => {
    return (
      <DrawerWrapper anchor="right" buttons={["Map"]}>
        <ModeSelector value={mode} onChange={ handleChangeMode }/>
        <Divider/>
        <LayerSelector 
          mode={mode} 
          mainLayersIds={mainLayersIds}
          secondLayersIds={secondLayersIds}
          setMainLayersIds={setMainLayersIds}
          setSecondLayersIds={setSecondLayersIds}
          />
        <Divider/>
        <OpacitySelector
          fillOpacity={fillOpacity}
          strokeOpacity={strokeOpacity}
          setFillOpacity={setFillOpacity}
          setStrokeOpacity={setStrokeOpacity}
          />
        <Divider/>
      </DrawerWrapper>
    )
  }
  
  const renderMapWrapper = () => {
    return <MapWrapper 
      mode={mode}
      mainLayersIds={mainLayersIds} 
      secondLayersIds={secondLayersIds} 
      fillOpacity={fillOpacity}
      strokeOpacity={strokeOpacity}
      />
  }

  const renderHeader = () => {
    return (
      <div className="my-header">
        <div className="header-text">Urban Scalable Toolkit for Infrastructure Resilient Regions</div>
        <div className="logo-container">
          <img className="climate-logo" src="./src/assets/new-climate-logo-background.png" alt="climate-logo"/>
          <img className="cleets-logo" src="./src/assets/cleets logo-01.png" alt="cleets-logo" />
        </div>
      </div>
    )
  }

  const render = () => {
    return (
      <>
        { renderHeader()}
        <div className="content">
          <div className="home">
            { renderMenu() }
            { renderMapWrapper() }
          </div>
        </div>
      </>
    )
  }

  return render()
}

export default Home