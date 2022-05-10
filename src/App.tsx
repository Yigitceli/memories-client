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
import { getAuthType, getRefreshToken } from "./utils";
import { logOut } from "./redux/userSlice";
import MemoryPage from "./pages/MemoryPage";

function App() {
  const { data } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const checkRefresh = async () => {
    if (getRefreshToken()) {
      const authType: string = getAuthType() as string;
      try {
        await axios.post(
          "http://localhost:5000/api/user/refresh-token",
          {
            refreshToken: getRefreshToken(),
          },
          {
            headers: {
              authType,
            },
          }
        );
      } catch (error) {
        dispatch(logOut());
        navigate("/auth");
      }
    }
  };

  useEffect(() => {
    checkRefresh();
  }, []);

  return (
    <div className="App relative w-full h-screen">
      <div className="w-full h-screen flex flex-col md:overflow-hidden relative">
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/auth"
            element={data ? <Navigate to="/" replace /> : <Auth />}
          />
          <Route path="/:id" element={<MemoryPage />} />
        </Routes>
      </div>
    </div>
  );
}

interceptor(store);

export default App;
