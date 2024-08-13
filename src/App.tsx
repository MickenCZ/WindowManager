import { useState } from 'react'
import './App.css'
import Navbar from './navbar/Navbar'
import WindowManager from './screen/WindowManager'
import { tApplications } from './types'
import getDefaultApplications from './lib/getDefaultApplications'

function App() {
  const [applications, setApplications] = useState<tApplications>(getDefaultApplications())

  return (
    <div id="main">
      <WindowManager applications={applications} setApplications={setApplications} />
      <Navbar applications={applications} />
    </div>
  )
}

export default App
