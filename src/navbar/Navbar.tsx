import { tApplications } from "../types"
import "./Navbar.css"
import NavbarIcon from "./NavbarIcon"
import StartMenuIcon from "./StartMenuIcon"
import MinimizeWindows from "./widgets/MinimizeWindows"
import TimeDateWidget from "./widgets/TimeDateWidget"

function Navbar({applications}: {applications: tApplications}) {
    return (
    <nav id="navbar">
        <div id="navIcons">
            <StartMenuIcon />
            
            { //Render icons for all the applications
            applications.map((application, i) => 
                <NavbarIcon imgPath={application.iconPath} appName={application.appname} isOpen={application.open} isActive={application.active} id={i} key={i} />
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