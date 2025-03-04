
import "./ColorBarWrapper.css"
import { useRef } from "react"
import Draggable from "react-draggable"

const ColorBarWrapper = (props: any) => {
  // const _display = props.mapData.length > 0 ? "block" : "none"
  const legRef = useRef<HTMLElement>(null)

  return (
    <Draggable nodeRef={legRef as React.RefObject<HTMLElement>} disabled={!props.controlDrag}>
      <div className='color-bar-wrapper' id="color-bar-wrapper" 
        style={{ display: props.display}}>
        <div style={{overflowY: "auto", overflowX: "clip", height: "73%", padding: "10px"}}>
          {props.children}
        </div>
      </div>
    </Draggable>
  )
}

export default ColorBarWrapper