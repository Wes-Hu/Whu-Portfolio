import { Route, Routes } from "react-router-dom";
import './App.css'
import HomePage from './pages/HomePage';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 w-screen h-24 z-50 backdrop-blur-md border-b-2 border-blood-red flex flex-row justify-between px-10 items-center">
          <a href="/" className="bg-blood-red w-16 h-16 p-2 rounded-xl">
            <img className="w-full h-full" src='/HuLogoWhite.png'/>
          </a>
          <div className="w-16 h-16">

          </div>
      </header>
      <main className="flex-grow pt-24">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes> 
      </main>

    </div>
  )
}

export default App
