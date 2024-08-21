import ChangeWallpaper from "../navbar/custom-apps/ChangeWallpaper"
import { tApplications } from "../types"


function getDefaultApplications(): tApplications {
    return [
        {
            appname: "Online Notepad",
            minimized: false,
            open: false,
            iconPath: "./notepad.ico",
            active: false,
            iFrameUrl: 'https://onlinenotepad.org/notepad',
            customContent: null,
        },
        {
            appname: "Bing search",
            minimized: false,
            open: false,
            iconPath: "./bing.ico",
            active: false, 
            iFrameUrl: 'https://www.bing.com/search?q=search',
            customContent: null,
        },
        {
            appname: "Programiz JS editor",
            minimized: false,
            open: false,
            iconPath: "./programiz.png",
            active: false,
            iFrameUrl: 'https://www.programiz.com/javascript/online-compiler/',
            customContent: null,
        },
        {
            appname: "Image viewer",
            minimized: false,
            open: false,
            iconPath: "./imageviewer.ico",
            active: false,
            iFrameUrl: 'https://image-viewer.com/',
            customContent: null,
            
        },
        {
            appname: "Change wallpaper",
            minimized: false,
            open: false,
            iconPath: "./wallpaper.svg",
            active: false,
            iFrameUrl: null,
            customContent: <ChangeWallpaper />,
        },
    ]
}

export default getDefaultApplications