import './App.css'
import { useState } from "react";
import HomeButton from "./components/HomeButton";
import Cursor from "./components/Cursor";
import NavMenu from './components/NavMenu';


function App() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col min-h-screen z-10">
      <Cursor/>
      <header className="fixed top-0 left-0 w-screen h-24 z-50 flex flex-row justify-between px-10 items-center">
        <HomeButton/>
        <NavMenu/>
      </header>
      <main className="">
        <h1 className="font-rubik text-blood-red text-9xl">Hello</h1>
        <h1 className="font-lora text-blood-red text-9xl">Hello</h1>
        <h1 className="font-montserrat text-blood-red text-9xl">Hello</h1>
        <h1 className="font-raleway text-blood-red text-9xl">Hello</h1>
      </main>
    </div>
  );
}

export default App;
