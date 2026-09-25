import { useMemo } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import './assets/styles/main.scss'

import Header from './components/header/Header'
import Profile from './components/profile/Profile'
import Education from './components/estudies/Education'
import Work from './components/work/Work'
import Skill from './components/profile/Skills'
import Portafolio from './components/proyects/Portafolio'
import Contact from './components/contact/Contact'
import Footer from './components/footer/Footer'
import WhatsAppChatWidget from './components/whatsapp/WhatsAppChatWidget'
import StructuredData from './components/seo/StructuredData'
import Info from './data/Info'

function App() {
  const { profile, seo } = Info

  const structuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${seo.siteUrl}#person`,
        name: profile.name,
        url: seo.siteUrl,
        image: seo.image,
        jobTitle: seo.jobTitle,
        telephone: profile.tel,
        email: `mailto:${profile.email}`,
        description: seo.description,
        sameAs: seo.sameAs
      },
      {
        '@type': 'WebSite',
        '@id': `${seo.siteUrl}#website`,
        url: seo.siteUrl,
        name: seo.title,
        description: seo.description,
        inLanguage: 'es',
        publisher: {
          '@id': `${seo.siteUrl}#person`
        }
      },
      {
        '@type': 'WebPage',
        '@id': `${seo.siteUrl}#webpage`,
        url: seo.siteUrl,
        name: seo.title,
        description: seo.description,
        isPartOf: {
          '@id': `${seo.siteUrl}#website`
        },
        about: {
          '@id': `${seo.siteUrl}#person`
        },
        inLanguage: 'es'
      }
    ]
  }), [profile, seo])

  return (
    <div className="App">
      <StructuredData schema={structuredData} />
      <Header />
      <Profile />
      <Contact />
      <Skill />
      <Portafolio />
      <Work />

      <section id="resume">
        <Education />
      </section>
      <Footer />
      <WhatsAppChatWidget />
    </div>
  )
}

export default App;
