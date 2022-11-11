import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Header from './components/header/Header'
import Profile from './components/profile/Profile'
import Education from './components/estudies/Education'
import Work from './components/work/Work'
import Skill from './components/profile/Skills'
import Portafolio from './components/proyects/Portafolio'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Header />
      <Profile />
      <Skill />
      <section id="resume">
        <Education />
        <Work />
      </section>
      <Portafolio />
    </div>
  )
}

export default App
