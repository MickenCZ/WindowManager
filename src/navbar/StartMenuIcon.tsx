import { useContext, useEffect, useRef, useState } from "react";
import "./StartMenuIcon.css"
import {tApplications } from "../types";
import { SetApplicationsContext } from "../App";

function StartMenuIcon({applications}: {applications: tApplications}) {
    const imgRef = useRef<HTMLImageElement>(null);
    const [dropupVisible, setDropupVisible] = useState(false)
    const setApplications = useContext(SetApplicationsContext) //for changing state of App.tsx

    const handleClick = () => {
        setDropupVisible(prevState => !prevState) //toggle visibility
        // For: Squish animation finishes even out of focus
        if (imgRef.current) {
            imgRef.current.focus();
            setTimeout(() => {
                if (imgRef.current) {
                    imgRef.current.blur(); // Remove focus after animation duration (200ms)
                }
              }, 200);
        }
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

    const handleOpen = (id: number) => setApplications(prevState => {
        const newState = [...prevState]
        if (newState[id]) {
            newState[id].active = true
            newState[id].open = true
            newState[id].minimized = false
        }
        return newState
    })

    return (
    <div title={"Start"} className={"navIconContainer"}>
        <img src={"logo.png"} alt={"Start button"} className="navIcon" tabIndex={0} ref={imgRef} onClick={handleClick}/>
        {dropupVisible && (
                <div className="startMenu activeDropUpMenu">
                    <h2 id="startMenuTitle">Launch an application: </h2>
                    {applications.map((application, id) => 
                        <div className="appCard" onClick={() => handleOpen(id)} key={id}>
                            <img src={application.iconPath} className="appCardImage" />
                            <div className="appCardName">{application.appname}</div>
                        </div>
                    )}
                </div>)}
    </div>
    )
}

export default StartMenuIcon