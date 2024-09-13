# Window Manager
This project features a window/application manager and a web user interface for a Windows-lookalike desktop environment. 
It can open, close, maximize and minimize windows, it can move them, crash them all to desktop (bottom-right button just like in Windows) and it features a nice start menu to launch applications, along with widgets for time+date and language.
It has a few preselected apps, such as a text editor, code editor, image viewer and a search engine, which are provided by external sources. If you don't like the beautiful provided wallpaper, there is also a custom app that allows you to change it, which also persists across page visits.
The same goes for the apps, this project is fully extensible, so anyone who can write HTML can add an app for this desktop environment using a graphical user interface through the "Add App" app, or can use the code provided to make new apps using configuration files. The precise method is listed below.
The app is written in React using modern hooks and using typescript.

## How to run project
    git clone https://github.com/MickenCZ/WindowManager.git
    cd ./WindowManager
    npm install
    npm run dev

## How to build project
    git clone https://github.com/MickenCZ/WindowManager.git
    cd ./WindowManager
    npm install
    npm run build

Result is in dist folder.

## How to programatically add more applications
First, decide the name, image and content of your application. If you want to use a local image, upload it to the public folder and remember its name. If not, just save a url.
Second, visit the src/lib/getDefaultApplications.tsx file. It's "basically" a JSON file with application data that the apps uses for default (ie. not added by the user graphically) apps. Here, you can add/remove objects to create/remove apps. If you don't want them to be default applications, you can just change it in your localstorage.
Third, to create a new application, just add an object like this to the array:

        {
                    appname: "Change wallpaper",
                    minimized: false,
                    open: false,
                    iconPath: "./wallpaper.svg",
                    active: false,
                    iFrameUrl: null,
                    customContent: <ChangeWallpaper />,
        },

Appname is self-explanatory, minimized means that the app is open, but isn't visible. Open means it is open. Active means the user is actively looking on it. iconPath is just a link to the image, you can both use url and local files in the public folder. iFrameUrl is if you just want to have an app, that is an iframe of a url, which is kind of powerful. If you leave it null, you can give the customContent a React component or just plain HTML in JSX. 
The advantage of adding apps this way and not through the gui is the easier Iframes, permanent apps and being able to use react components.

## A word about state management architecture of this project
The App.tsx component holds the entire application state, which means that to make any changes to applications, including their open/minimized/active state, or to add new ones, one has to change state of App.tsx. This is the central-source-of-truth architecture. While it is typical for Redux, I have decided not to use it, as it's overkill, the useContext hook is absolutely fine here, in every file you want to change app state, just make use of the useContext hook and import the context from the App.tsx file, it's very convenient. 
This state is then propagated (application state is prop-drilled, but application change uses context, because the prop-drilling depths are shallower for read operations than for write operations (setting state)) to both the window manager (main screen with windows) and Navbar (bottom navigation bar with apps). Both the windows and navbar icons are rendered through a map that is called on the application state array, so through react rerendering rules, the windows and navbar always update themselves to reflect latest state.

## Video Showcase

https://github.com/user-attachments/assets/612ebebf-f5ed-48ae-988e-ce4b8d03931f

