import { ReactNode } from "react"

export type tApplication = {
        appname: string,
        minimized: boolean,
        open: boolean,
        active: boolean,
        iconPath: string,
        iFrameUrl: string | null,
        customContent: ReactNode | null,
}


/* 
* It's important that each applications also knows its id, which is the array index
*/

export type tApplications = tApplication[]

export type Position = {
        x: number
        y: number
}
