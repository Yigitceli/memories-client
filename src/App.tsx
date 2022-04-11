import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Auth from "./pages/Auth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "./redux/store";
import Dashboard from "./pages/Dashboard";

import { logOut } from "./redux/userSlice";

function App() {
  const { data } = useSelector((state: RootState) => state.user);

  const dispatch = useAppDispatch();

  return (
    <div className="App p-4 relative w-100 h-screen flex flex-col ">
      
      <BrowserRouter>
        <NavBar          
        />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/auth"
            element={data ? <Navigate to="/" replace /> : <Auth />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
