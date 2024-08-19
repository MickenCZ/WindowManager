import { useContext, useEffect, useRef, useState } from "react"
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
    const [dropupVisible, setDropupVisible] = useState(false)
    const setApplications = useContext(SetApplicationsContext) //for changing state of App.tsx

    const toggleAppOpen = (close: boolean) => {
        //Opening apps
        setApplications(prevState => {
            const newState = [...prevState] // copy state
            if (newState[id]) {
                if (close && newState[id].active) { // close it
                    newState[id].open = false
                    newState[id].active = false
                    newState[id].minimized = false
                }
                else if (!close && newState[id].active) { // minimize it
                    newState[id].active = false
                    newState[id].minimized = true
                }
                else { // if app isn't active, open it, make it active, show it
                    newState[id].open = true
                    newState[id].active = true
                    newState[id].minimized = false
                }
            }
            return newState
        })
    }

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
        toggleAppOpen(false)
    }

    const handleRightClick = (event: React.MouseEvent) => {
        event.preventDefault() // Prevent default context menu
        setDropupVisible(true)
    }

    const handleDocumentClick = (event: MouseEvent) => { // Close when you click away
        if (imgRef.current && !imgRef.current.contains(event.target as Node)) {
            setDropupVisible(false)
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleDocumentClick);
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    const handleDropupItemClick = () => {
        setDropupVisible(false);
        toggleAppOpen(true)
    };

    

    

    let iconClassName = "navIconContainer"
    if (isActive) {iconClassName = "navIconContainer isActive"} // So that little blip under icon shows up.
    else if (isOpen) {iconClassName = "navIconContainer isOpen"} // It has to be NOT active and has to be open for this to make sense

    return (
    <div title={appName} className={iconClassName} onContextMenu={handleRightClick}>
        <img src={imgPath} alt={appName} className="navIcon" tabIndex={0} ref={imgRef} onClick={handleClick}/>
        {dropupVisible && (
                <div className="dropupMenu activeDropUp">
                    {isOpen ? 
                    <div className="dropupOption" onClick={handleDropupItemClick} title="Close">Close app</div> :
                    <div className="dropupOption" onClick={handleDropupItemClick} title="Open">Open app</div>
                    }
                </div>
            )}
    </div>
    )
}

export default NavbarIcon