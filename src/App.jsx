import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Education from './components/Education'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Footer from './components/Footer'
import Achievements from './components/Achievements'
import GraphicsPortfolio from './components/GraphicsDesign'
import FeaturedProjects from './components/FeaturedProjects'
import './App.css'

function App() {
  return (
    <div className="">
      <Navbar/>
      <main className="">
        
        <Hero />
        <Experience/>
        <Education/>
        <Achievements/>
        <Projects/>
        <Skills/>
        <GraphicsPortfolio/>
        <FeaturedProjects/>
        <Footer/>
      </main>
    </div>
  )
}

export default App