import { useRef } from "react";
import "./StartMenuIcon.css"

function StartMenuIcon() {
    const imgRef = useRef<HTMLImageElement>(null);

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
    }

    return (
    <div title={"Start"} className={"navIconContainer"}>
        <img src={"logo.png"} alt={"Start button"} className="navIcon" tabIndex={0} ref={imgRef} onClick={handleClick}/>
    </div>
    )
}

export default StartMenuIcon