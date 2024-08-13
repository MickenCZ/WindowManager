import { useContext } from "react"
import "./MinimizeWindows.css"
import { SetApplicationsContext } from "../../App"

function MinimizeWindows() {
    const setApplications = useContext(SetApplicationsContext) //for changing state of App.tsx
    
    const handleClick = () => setApplications(prevState => {
        const newState = [...prevState] //change, not mutate state
        for (const application of newState) {
            application.active = false
            application.minimized = true
        }
        return newState
    })

    return (
        <div id="minimizeWindows" onClick={handleClick}>
            <div id="minimizeWindowsButton" tabIndex={0}></div>
        </div>
    )
}

export default MinimizeWindows