import "./WindowManager.css"
import Window from "./Window"
import { useState } from "react"
import { tApplications } from "../types"

function WindowManager({applications, setApplications}: {applications: tApplications, setApplications: React.Dispatch<React.SetStateAction<tApplications>>}) {
    const [highestZIndex, setHighestZIndex] = useState(1)
    const bringToFront = () => {setHighestZIndex((prevIndex) => prevIndex + 1)}

    return (
    <main id="screen">
        {applications.map((application, i) => 
            application.open && <Window highestZIndex={highestZIndex} bringToFront={bringToFront} key={i} id={i} children={application.children} setApplications={setApplications} />
        )}
    </main>
    )
}

export default WindowManager