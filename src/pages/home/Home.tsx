import "./Home.css"
import MapWrapper from "../../components/map/MapWrapper"
import DrawerWrapper from "../../components/drawer/DrawerWrapper"
import VerticalButtonList from "../../components/drawer/layers-content"

const Home = () => {

  const renderMenu = () => {
    return (
      <DrawerWrapper anchor="right" buttons={["Layers"]}>
        <VerticalButtonList/>
      </DrawerWrapper>
    )
  }
  
  const renderMapWrapper = () => {
    return <MapWrapper/>
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