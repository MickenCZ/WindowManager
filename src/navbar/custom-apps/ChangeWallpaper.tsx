import { useContext, useState } from "react"
import { SetCustomWallpaperContext } from "../../screen/WindowManager"
import "./apps.css"

function ChangeWallpaper() {
    const setCustomWallpaper = useContext(SetCustomWallpaperContext) //for changing state of App.tsx
    const [wallpaperFormValue, setWallpaperFormValue] = useState("")

    return (
        <div className="appContainer">
            <h2>Change your wallpaper: </h2>
            <form>
                <label htmlFor="imageURL">Enter the URL of the image:</label>
                <input type="url" id="imageURL" value={wallpaperFormValue} onChange={event => setWallpaperFormValue(event.target.value)} />
                <button type="button" className="greenButton" onClick={() => {
                    setCustomWallpaper(wallpaperFormValue)
                    localStorage.setItem("wallpaper", wallpaperFormValue)
                }}>Change</button>
                <button type="button" className="lightBlueButton" onClick={() => {
                    setCustomWallpaper(false)
                    localStorage.removeItem("wallpaper")
                }}>Revert to default wallpaper</button>
            </form>
        </div>
    )
}

export default ChangeWallpaper