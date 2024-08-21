import { useContext, useState } from "react"
import "./apps.css"
import { SetApplicationsContext } from "../../App"
import getDefaultApplications from "../../lib/getDefaultApplications"

function AddApp() {
    const [appFormValue, setAppFormValue] = useState("")
    const [iconUrl, setIconUrl] = useState("")
    const [appName, setAppName] = useState("")
    const setApplications = useContext(SetApplicationsContext) //for changing state of App.tsx

    return (
        <div className="appContainer">
            <h2>Upload a new application: </h2>
            <form>
                <label htmlFor="nameInput">Enter the application name:</label>
                <input type="text" id="nameInput" value={appName} onChange={event => setAppName(event.target.value)} />
                <label htmlFor="iconInput">Enter the application icon url:</label>
                <input type="text" id="iconInput" value={iconUrl} onChange={event => setIconUrl(event.target.value)} />
                <label htmlFor="htmlInput">Paste the html code for the app:</label>
                <input type="text" id="htmlInput" value={appFormValue} onChange={event => setAppFormValue(event.target.value)} />
                <button type="button" className="greenButton" onClick={() => setApplications(prevState => {
                    const newState = [...prevState]
                    const newApp = {
                        appname: appName,
                        minimized: false,
                        open: false,
                        iconPath: iconUrl,
                        active: false,
                        iFrameUrl: null,
                        customContent: appFormValue
                    }
                    newState.push(newApp)
                    const alreadySavedApps = localStorage.getItem("extraApplications")
                    if (alreadySavedApps !== null) {
                        const apps = JSON.parse(alreadySavedApps)
                        apps.push(newApp)
                        localStorage.setItem("extraApplications", JSON.stringify(apps))
                    }
                    else {
                        localStorage.setItem("extraApplications", JSON.stringify([newApp]))
                    }
                    return newState
                })}>Add app</button>
                <button type="button" className="redButton" onClick={() => {
                    localStorage.removeItem("extraApplications")
                    setApplications(getDefaultApplications())
                }}>Delete all uploaded apps</button>
            </form>
        </div>
    )
}

export default AddApp