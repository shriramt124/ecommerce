import './App.css'
import Layout from './components/layouts/Layout'
import Hero from './components/Hero'
import ShopByCategory from './components/ShopByCategory'
import NewCollection from './components/NewCollection'
import AboutEvair from './components/AboutEvair'

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ShopByCategory />
      <NewCollection />
      <AboutEvair />
    </div>
  )
}

export default App
