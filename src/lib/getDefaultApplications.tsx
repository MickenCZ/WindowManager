import { tApplications } from "../types"


function getDefaultApplications(): tApplications {
    return [
        {
            appname: "Note taking app",
            minimized: false,
            open: true,
            iconPath: "./notepad.png",
            active: true,
            children:  <iframe src='https://onlinenotepad.org/notepad' width={600} height={500}></iframe>,
        },
    ]
}

export default getDefaultApplications