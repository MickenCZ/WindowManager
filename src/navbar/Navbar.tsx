import "./Navbar.css"
import NavbarIcon from "./NavbarIcon"
import MinimizeWindows from "./widgets/MinimizeWindows"
import TimeDateWidget from "./widgets/TimeDateWidget"

function Navbar() {
    return (
    <nav id="navbar">
        <div id="navIcons">
            <NavbarIcon imgPath="./logo.png" imgAlt="Macrohard doors logo" tooltip="Start"/>
            <NavbarIcon imgPath="./vscode.png" imgAlt="Visual Studio Code" tooltip="Visual Studio Code"/>
            <NavbarIcon imgPath="./notepad.png" imgAlt="My Notepad App" tooltip="Notepad App" />
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