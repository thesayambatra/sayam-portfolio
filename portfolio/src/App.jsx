import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Tools from './components/Tools'
import EditingPortfolio from './components/EditingPortfolio'
import Channels from './components/Channels'
import Certifications from './components/Certifications'
import CtaBanner from './components/CtaBanner'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Skills />
        <Tools />
        <EditingPortfolio />
        <Channels />
        <Certifications />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
