import './App.css'
import Layout from './components/layouts/Layout'
import Hero from './components/Hero'
import ShopByCategory from './components/ShopByCategory'
import NewCollection from './components/NewCollection'

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ShopByCategory />
      <NewCollection />
    </div>
  )
}

export default App
