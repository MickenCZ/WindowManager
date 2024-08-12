import { tApplications } from "../types"
import "./Navbar.css"
import NavbarIcon from "./NavbarIcon"
import MinimizeWindows from "./widgets/MinimizeWindows"
import TimeDateWidget from "./widgets/TimeDateWidget"

function Navbar({applications}: {applications: tApplications}) {
    return (
    <nav id="navbar">
        <div id="navIcons">
            <NavbarIcon imgPath="./logo.png" appName="Start" />
            
            { //Render icons for all the applications
            applications.map(application => 
                <NavbarIcon imgPath={application.iconPath} appName={application.appname} />
            )}

        </div>
        <div id="status">
            <MinimizeWindows />
            <TimeDateWidget />
            <div id="language">{navigator.language}</div>
        </div>
    </nav>
    )
}

export default Navbar