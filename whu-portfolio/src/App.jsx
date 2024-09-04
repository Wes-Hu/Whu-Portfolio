import './App.css'
import { useState } from "react";
import HomeButton from "./components/HomeButton";
import Cursor from "./components/Cursor";
import NavMenu from './components/NavMenu';


function App() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col z-10">
      <Cursor/>
      <header className="fixed top-0 left-0 w-screen h-24 z-50 flex flex-row justify-between px-3 md:px-10 items-center">
        <HomeButton/>
        <NavMenu/>
      </header>
      <main className="flex flex-col">
        <div id="Home" className=" h-screen">

        </div>
        <div id="About" className=" h-screen">

        </div>
        <div id="Projects" className=" h-screen">

        </div>
        <div id="Experience" className=" h-screen">

        </div>
        <div id="Contact" className=" h-screen bg-white">
        
        </div>
      </main>
    </div>
  );
}

export default App;
