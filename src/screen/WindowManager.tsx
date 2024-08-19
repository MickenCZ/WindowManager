import "./WindowManager.css"
import Window from "./Window"
import { createContext, Dispatch, SetStateAction, useState } from "react"
import { tApplications } from "../types"

export const SetCustomWallpaperContext = createContext<Dispatch<SetStateAction<string | false>>>(() => {})

function WindowManager({applications}: {applications: tApplications}) {
    const [highestZIndex, setHighestZIndex] = useState(1)
    const bringToFront = () => {setHighestZIndex((prevIndex) => prevIndex + 1)}
    const [customWallpaper, setCustomWallpaper] = useState<string | false>(false)

    return (
    <main id="screen" className={customWallpaper ? undefined : "defaultWallpaper"} style={customWallpaper ? {backgroundImage: `url(${customWallpaper})`} : undefined}>
        {applications.map((application, i) => {
            if (application.open && !application.minimized) {
                return (<SetCustomWallpaperContext.Provider value={setCustomWallpaper} key={i}>
                    <Window highestZIndex={highestZIndex} bringToFront={bringToFront} id={i} 
                    hide={false} customContent={application.customContent} iFrameUrl={application.iFrameUrl} />
                </SetCustomWallpaperContext.Provider>)
            } 
            //Hide just hides it with css. While closing, we derender the component and destroy position data,
            // while minimizing, we keep the component active, so that its position information is kept when again activated.

            else if (application.open && application.minimized) {
                return (<SetCustomWallpaperContext.Provider value={setCustomWallpaper}  key={i}>
                    <Window highestZIndex={highestZIndex} bringToFront={bringToFront} id={i} 
                    hide={true} customContent={application.customContent} iFrameUrl={application.iFrameUrl} />
                </SetCustomWallpaperContext.Provider>)
            }
        })}
    </main>
    )
}

export default WindowManager