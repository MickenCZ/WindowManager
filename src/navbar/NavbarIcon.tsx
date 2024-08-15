import { useContext, useRef } from "react"
import "./NavbarIcon.css"
import { SetApplicationsContext } from "../App";

type tProps = {
    imgPath: string,
    appName: string,
    isOpen: boolean,
    isActive: boolean,
    id: number,
}

function NavbarIcon({imgPath, appName, isOpen, isActive, id}: tProps) {
    const imgRef = useRef<HTMLImageElement>(null);
    const setApplications = useContext(SetApplicationsContext) //for changing state of App.tsx

    const handleClick = () => {
        // For: Squish animation finishes even out of focus
        if (imgRef.current) {
            imgRef.current.focus();
            setTimeout(() => {
                if (imgRef.current) {
                    imgRef.current.blur(); // Remove focus after animation duration (200ms)
                }
              }, 200);
        }

        //Opening apps
        setApplications(prevState => {
            const newState = [...prevState]
            if (newState[id]) {
                newState[id].active = true
                newState[id].minimized = false
                newState[id].open = true
            }
            return newState
        })
    }

    let iconClassName = "navIconContainer"
    if (isActive) {iconClassName = "navIconContainer isActive"} // So that little blip under icon shows up.
    else if (isOpen) {iconClassName = "navIconContainer isOpen"} // It has to be NOT active and has to be open for this to make sense

    return (
    <div title={appName} className={iconClassName}>
        <img src={imgPath} alt={appName} className="navIcon" tabIndex={0} ref={imgRef} onClick={handleClick}/>
    </div>
    )
}

export default NavbarIcon