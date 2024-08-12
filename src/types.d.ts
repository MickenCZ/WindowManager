
/* 
* random id points to application object, which has an app name and children to be inserted in the window
* (like an notepad application component or an iframe)
*/
export type tApplications = {
    [key: string]: {
        appname: string,
        children: Element
    }
}