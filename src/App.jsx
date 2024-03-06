// import { useState } from "react";
// import axios from "axios";
import DefaultPage from "./pages/DefaultPage";

// https://animechan.xyz/api/random (free testing api)

function App() {  
  return (
    <div>
          <nav className="bg-[#10b981] text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <a href="#" className="text-lg font-semibold">
            OKK-POSTMAN
          </a>
          {/* Add more navbar items here if needed */}
        </div>
      </div>
    </nav>
    <DefaultPage />  
    </div>
  )
}

export default App;