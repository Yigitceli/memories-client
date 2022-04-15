import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Auth from "./pages/Auth";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import store, { RootState, useAppDispatch } from "./redux/store";
import Dashboard from "./pages/Dashboard";
import axios from "axios";
import { interceptor } from "./AxiosAuth";
import { getRefreshToken } from "./utils";
import { logOut } from "./redux/userSlice";

function App() {
  const { data } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate()
  const dispatch = useAppDispatch();

  const checkAuth = async () => {
    try {
      await axios.post(`http://localhost:5000/api/user/refresh-token`, {
        refreshToken: getRefreshToken(),
      });
    } catch (error) {
      dispatch(logOut())
      navigate('/auth')
    }
  };

  useEffect(() => {
    checkAuth()
  }, []);

  return (
    <div className="App p-4 relative w-100 h-screen flex flex-col ">
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
  );
}

interceptor(store);

export default App;
