import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import './assets/style/default.css'
import './assets/style/layout.css'
import './assets/style/animate.css'
import './assets/style/metricstyle.css'
import './assets/style/media-queries.css'
import './assets/style/magnific-popup.css'
import './assets/style/portafolio.css'
import './assets/style/work.css'
import './assets/style/skill.css'
import './assets/style/galeria.css'

import Header from './components/header/Header'
import Profile from './components/profile/Profile'
import Education from './components/estudies/Education'
import Work from './components/work/Work'
import Skill from './components/profile/Skills'
import Portafolio from './components/proyects/Portafolio'
import Contact from './components/contact/Contact'
import Footer from './components/footer/Footer'

function App() {
  return (
    <div className="App">
      <Header />
      <Profile />
      <Portafolio />
      <Work />
      <Skill />
      <section id="resume">
        <Education />
      </section>
      {/* <Contact /> */}
      <Footer />
    </div>
  )
}

export default App;
