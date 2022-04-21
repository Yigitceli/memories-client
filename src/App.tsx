import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Auth from "./pages/Auth";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import store, { RootState, useAppDispatch } from "./redux/store";
import Dashboard from "./pages/Dashboard";
import axios from "axios";
import { interceptor } from "./AxiosAuth";
import { getRefreshToken } from "./utils";
import { logOut } from "./redux/userSlice";

function App() {
  const { data } = useSelector((state: RootState) => state.user);

  return (
    <div className="App relative w-full h-screen flex flex-col">
      <div className="w-full h-full p-4 overflow-hidden">
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/auth"
              element={data ? <Navigate to="/" replace /> : <Auth />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

interceptor(store);

export default App;
