import './App.css'
import { useState } from "react";
import HomeButton from "./components/HomeButton";
import Cursor from "./components/Cursor";
import NavMenu from './components/NavMenu';


function App() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Cursor/>
      <header className="fixed top-0 left-0 w-screen h-24 z-50 flex flex-row justify-between px-10 items-center">
        <HomeButton/>
        <NavMenu/>
      </header>
      <main>

      </main>
    </div>
  );
}

export default App;
