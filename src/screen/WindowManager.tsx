import "./WindowManager.css"
import Window from "./Window"
import { useState } from "react"
import { tApplications } from "../types"

function WindowManager({applications}: {applications: tApplications}) {
    const [highestZIndex, setHighestZIndex] = useState(1)
    const bringToFront = () => {setHighestZIndex((prevIndex) => prevIndex + 1)}

    return (
    <main id="screen">
        {applications.map((application, i) => {
            if (application.open && !application.minimized) {
                return <Window highestZIndex={highestZIndex} bringToFront={bringToFront} key={i} id={i} children={application.children} hide={false} />
            } 
            //Hide just hides it with css. While closing, we derender the component and destroy position data,
            // while minimizing, we keep the component active, so that its position information is kept when again activated.

            else if (application.open && application.minimized) {
                return <Window highestZIndex={highestZIndex} bringToFront={bringToFront} key={i} id={i} children={application.children} hide={true} />
            }
        })}
    </main>
    )
}

export default WindowManager