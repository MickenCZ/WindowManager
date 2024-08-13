import { useState } from 'react'
import './App.css'
import Navbar from './navbar/Navbar'
import Screen from './screen/WindowManager'
import { tApplications, tApplication } from './types'
import getDefaultApplications from './lib/getDefaultApplications'

function App() {
  const [applications, setApplications] = useState<tApplications>(getDefaultApplications())

  return (
    <div id="main">
      <Screen applications={applications} />
      <Navbar applications={applications} />
    </div>
  )
}

export default App
