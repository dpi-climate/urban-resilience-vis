import "./Home.css"
import MapWrapper from "../../components/map/MapWrapper"
import DrawerWrapper from "../../components/drawer/DrawerWrapper"
import LayersOptions from "../../components/drawer/LayersOptions"
import ScreenModes from "../../components/drawer/ScreenModes"
import { Divider } from "@mui/material"
import { useState } from "react"
import { TMode } from "../../types-and-interfaces/types"

const Home = () => {

  // const [mode, setMode] = useState<TMode>("single")
  // const [mode, setMode] = useState<TMode>("split")
  const [mode, setMode] = useState<TMode>("side-by-side")
  const [mainLayersIds, setMainLayersIds] = useState<string[]>([])
  const [secondLayersIds, setSecondLayersIds] = useState<string[]>([])

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
        <ScreenModes value={mode} onChange={ handleChangeMode }/>
        <Divider/>
        <LayersOptions 
          mode={mode} 
          mainLayersIds={mainLayersIds}
          secondLayersIds={secondLayersIds}
          setMainLayersIds={setMainLayersIds}
          setSecondLayersIds={setSecondLayersIds}
          />
        <Divider/>
      </DrawerWrapper>
    )
  }
  
  const renderMapWrapper = () => {
    return <MapWrapper 
      mainLayersIds={mainLayersIds} 
      secondLayersIds={secondLayersIds} 
      mode={mode}
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