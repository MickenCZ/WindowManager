import "./WindowManager.css"
import Window from "./Window"
import { useState } from "react"

function WindowManager() {
    const [highestZIndex, setHighestZIndex] = useState(1)
    const bringToFront = () => {setHighestZIndex((prevIndex) => prevIndex + 1)}

    return (
    <main id="screen">
        <Window highestZIndex={highestZIndex} bringToFront={bringToFront} id={1} />
        <Window highestZIndex={highestZIndex} bringToFront={bringToFront} id={2} />
    </main>
    )
}

export default WindowManager