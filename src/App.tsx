import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'
import './App.css'
import Navbar from './navbar/Navbar'
import WindowManager from './screen/WindowManager'
import { tApplications } from './types'
import getDefaultApplications from './lib/getDefaultApplications'

export const SetApplicationsContext = createContext<Dispatch<SetStateAction<tApplications>>>(() => {})

function App() {
  const [applications, setApplications] = useState<tApplications>(getDefaultApplications())

  useEffect(() => {
    const alreadySavedApps = localStorage.getItem("extraApplications")
    if (alreadySavedApps !== null) {
      setApplications(prevState => [...prevState, ...JSON.parse(alreadySavedApps)])
    }
  }, [])

  return (
    <div id="main">
      <SetApplicationsContext.Provider value={setApplications}>
          <WindowManager applications={applications} />
          <Navbar applications={applications} />
      </SetApplicationsContext.Provider>
    </div>
  )
}


export default App
