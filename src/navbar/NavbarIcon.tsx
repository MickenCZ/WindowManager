import { useRef } from "react"
import "./NavbarIcon.css"

type tProps = {
    imgPath: string,
    imgAlt: string,
    tooltip: string,
}

function NavbarIcon({imgPath, imgAlt, tooltip}: tProps) {
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
    <div className="navIconContainer" title={tooltip}>
        <img src={imgPath} alt={imgAlt} className="navIcon" tabIndex={0} ref={imgRef} onClick={handleClick}/>
    </div>
    )
}

export default NavbarIcon