import { Route, Routes } from "react-router-dom";
import './App.css'
import HomePage from './pages/HomePage';
import Drip from "./components/Drip";
import { useState } from "react";
import HomeButton from "./components/HomeButton";

function App() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 w-screen h-24 z-50 flex flex-row justify-between px-10 items-center">
        <HomeButton/>
      </header>
      <main className="flex-grow pt-24">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
