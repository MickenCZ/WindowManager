
export type tApplication = {
        appname: string,
        minimized: boolean,
        open: boolean,
        active: boolean,
        iconPath: string,
        children: ReactElement,
}


/* 
* It's important that each applications also knows its id, which is the array index
*/

export type tApplications = tApplication[]