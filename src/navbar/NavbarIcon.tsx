import { useRef } from "react"
import "./NavbarIcon.css"

type tProps = {
    imgPath: string,
    appName: string,
    isOpen: boolean,
    isActive: boolean,
    id: number,
}

function NavbarIcon({imgPath, appName, isOpen, isActive, id}: tProps) {
    const imgRef = useRef<HTMLImageElement>(null);

    // For: Squish animation finishes even out of focus
    const handleClick = () => {
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
    <div title={appName} className={isOpen && !isActive ? "navIconContainer isActive" : "navIconContainer"}>
        <img src={imgPath} alt={appName} className="navIcon" tabIndex={0} ref={imgRef} onClick={handleClick}/>
    </div>
    )
}

export default NavbarIcon