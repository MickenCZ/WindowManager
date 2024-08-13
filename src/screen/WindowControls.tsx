import { useContext } from "react"
import "./WindowControls.css"
import { SetApplicationsContext } from "../App"

type tProps = {
    id: number, //id of application window
    isFullScreen: boolean,
}

function WindowControls({id, isFullScreen}: tProps) {
    const setApplications = useContext(SetApplicationsContext) //for changing state of App.tsx
    
    const handleClose = () => setApplications(prevState => {
        const newState = [...prevState] //If I dont return new state and only copy existing state, it doesnt rerender
        if (newState[id]) {
          newState[id].open = false
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

    return (<>
          <img src="todesktop.svg" alt="Minimize" className="windowControlIcon" title='Minimize' onClick={handleMinimize} />
          <img src={isFullScreen ? "minimize.svg" : "maximize.svg"} alt="Maximize" className="windowControlIcon" title='Maximize' />
          <img src="close.svg" alt="Close" className="windowControlIcon close" title='Close' onClick={handleClose} />
    </>)
}

export default WindowControls