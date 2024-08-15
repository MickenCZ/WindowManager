import { Dispatch, SetStateAction, useContext, useState } from "react"
import "./WindowControls.css"
import { SetApplicationsContext } from "../App"
import { Position } from "../types"

type tProps = {
    id: number, //id of application window
    isFullScreen: boolean,
    position: Position,
    setPosition: Dispatch<SetStateAction<{x: number; y: number}>>,
    setIsFullscreen: Dispatch<SetStateAction<boolean>>,
}

function WindowControls({id, isFullScreen, position, setPosition, setIsFullscreen}: tProps) {
    const setApplications = useContext(SetApplicationsContext) //for changing state of App.tsx
    const [lastPosition, setLastPosition] = useState<Position>(position)
    
    const handleClose = () => setApplications(prevState => {
        const newState = [...prevState] //If I dont return new state and only copy existing state, it doesnt rerender
        if (newState[id]) {
          newState[id].open = false
          newState[id].active = false
        }
        return newState
    })

    const handleMinimize = () => setApplications(prevState => {
        const newState = [...prevState]
        if (newState[id]) {
            newState[id].minimized = true
            newState[id].active = false
        }
        return newState
    })

    const handleMaximize = () => {
        if (!isFullScreen) { //going into fullscreen
            setLastPosition(() => {return {x: position.x, y: position.y}})
            setPosition({x: 0, y: 0}) //size expands right and bottom, so it needs to be left and top
            setIsFullscreen(true)
        }
        else { //going out of fullscreen
            setPosition({x: lastPosition.x, y: lastPosition.y})
            setIsFullscreen(false)
        }
    }

    return (<>
          <img src="todesktop.svg" alt="Minimize" className="windowControlIcon" title='Minimize' onClick={handleMinimize} />
          <img src={isFullScreen ? "minimize.svg" : "maximize.svg"} alt="Maximize" className="windowControlIcon" title='Maximize' onClick={handleMaximize} />
          <img src="close.svg" alt="Close" className="windowControlIcon close" title='Close' onClick={handleClose} />
    </>)
}

export default WindowControls