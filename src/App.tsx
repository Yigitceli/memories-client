import { useState } from "react";
import NavBar from "./components/NavBar";
import Auth from "./pages/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App w-100 h-screen p-4 relative flex flex-col">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
