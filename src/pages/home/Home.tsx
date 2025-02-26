import "./Home.css"
import MapWrapper from "../../components/map/MapWrapper"
import DrawerWrapper from "../../components/drawer/DrawerWrapper"
import VerticalButtonList from "../../components/drawer/layers-content"
import ModeOptions from "../../components/drawer/map-mode-content"
import { Divider } from "@mui/material"
import { useState } from "react"
import { TMode } from "../../types-and-interfaces/types"

const Home = () => {

  const [mode, setMode] = useState<TMode>("single")
  // const [mode, setMode] = useState("side-by-side")
  const [mainLayersIds, setMainLayersIds] = useState([])

  const renderMenu = () => {
    return (
      <DrawerWrapper anchor="right" buttons={["Layers"]}>
        <ModeOptions/>
        <Divider/>
        <VerticalButtonList 
          mode={mode} 
          setMainLayersIds={setMainLayersIds} 
          // setSecondaryLayersIds={setSecondaryLayersIds}
          mainLayersIds={mainLayersIds}
          
          />
        <Divider/>
      </DrawerWrapper>
    )
  }
  
  const renderMapWrapper = () => {
    return <MapWrapper mainLayersIds={mainLayersIds} mode={mode}/>
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