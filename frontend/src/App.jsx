import './App.css'
import Layout from './components/layouts/Layout'
import Hero from './components/Hero'
import ShopByCategory from './components/ShopByCategory'
import NewCollection from './components/NewCollection'
import AboutEvair from './components/AboutEvair'
import { motion } from 'framer-motion'
import NewArrivals from './components/NewArrivals'

function App() {
  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-white to-gray-50">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[30%] right-0 w-64 h-64 bg-gray-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute top-[60%] left-0 w-96 h-96 bg-gray-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[20%] w-80 h-80 bg-gray-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <Hero />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="relative"
        >
          <ShopByCategory />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="relative"
        >
          <NewCollection />

        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="relative"
        >
          <NewArrivals />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="relative"
        >
          <AboutEvair />
        </motion.div>

        {/* Connecting elements */}
        <div className="absolute left-1/2 transform -translate-x-1/2 z-0 w-px h-full top-0 bg-gradient-to-b from-transparent via-gray-200 to-transparent opacity-70"></div>
      </div>
    </div>
  )
}

export default App
