import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Auth from "./pages/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";



function App() {
  const { data } = useSelector((state: RootState) => state.user);

  
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
