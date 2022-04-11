import memoriesTitle from "../assets/title.png";
import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { logOut } from "../redux/userSlice";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

const authNavbar =
  "relative my-4 z-10 bg-white py-2 px-14 text-white flex items-center shadow-final w-full rounded-lg justify-center";
const navbar =
  "relative my-4 z-10 bg-white py-2 px-14 text-white flex items-center shadow-final w-full rounded-lg justify-between";

const NavBar = () => {
  const [isAuthLoading, setIsAuthLoadling] = useState<boolean>(false);
  const pathname = useLocation().pathname;
  const { data } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  let timer: ReturnType<typeof setTimeout>;
  const logOutHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsAuthLoadling(true);
    const setDisactivateAuthLoadling = () => {
      dispatch(logOut());
      setIsAuthLoadling(false);
    };
    timer = setTimeout(setDisactivateAuthLoadling, 1000);
  };

  useEffect(() => {
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={pathname != "/auth" ? navbar : authNavbar}>
      <Link to={"/"}>
        <img
          src={memoriesTitle}
          className="transition ease-in-out duration-100 hover:scale-110 cursor-pointer w-[250px]"
        />
      </Link>
      {isAuthLoading && (
        <div className="fixed bg-opacity z-30 w-full h-screen flex items-center justify-center inset-0">
          <ReactLoading
            className="flex items-center "
            type={"spin"}
            color={"#f50057"}
            height={350}
            width={125}
          />
        </div>
      )}

      {pathname != "/auth" &&
        (data ? (
          <div className="flex items-center gap-10">
            <img
              className="hover:scale-110 cursor-pointer transition-all duration-100 ease-in-out rounded-full w-12"
              src={data.photoUrl!}
            />
            <p className="text-black font-bold">{data.displayName}</p>
            <button
              onClick={logOutHandler}
              className="bg-secondary transition ease-in-out duration-100 hover:scale-110 shadow-button px-4 py-2 rounded-md font-bold"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link to={"/auth"}>
            <button className="bg-secondary transition ease-in-out duration-100 hover:scale-110 shadow-button px-4 py-2 rounded-md font-bold">
              Sign In
            </button>
          </Link>
        ))}
    </div>
  );
};

export default NavBar;
