import { useContext, useRef } from "react"
import { SetCustomWallpaperContext } from "../../screen/WindowManager"
import "./changeWallpaper.css"

function ChangeWallpaper() {
    const setCustomWallpaper = useContext(SetCustomWallpaperContext) //for changing state of App.tsx
    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <div id="setWallpaperContainer">
            <h2>Change your wallpaper: </h2>
            <form>
                <label htmlFor="imageURL">Enter the URL of the image:</label>
                <input type="url" id="imageURL" ref={inputRef} />
                <button type="button" id="changeWallPaperButton" onClick={() => {
                    if (inputRef.current) {
                        setCustomWallpaper(inputRef.current.value)
                    }
                }}>Change</button>
                <button type="button" id="revertWallPaperButton" onClick={() => {
                    setCustomWallpaper(false)
                }}>Revert to default wallpaper</button>
            </form>
        </div>
    )
}

export default ChangeWallpaper