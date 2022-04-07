import memoriesTitle from "../assets/title.png";
import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { logOut } from "../redux/userSlice";

const authNavbar =
  "relative my-4 z-10 bg-white py-2 px-14 text-white flex items-center shadow-final w-full rounded-lg justify-center";
const navbar =
  "relative my-4 z-10 bg-white py-2 px-14 text-white flex items-center shadow-final w-full rounded-lg justify-between";

function NavBar() {
  const pathname = useLocation().pathname;
  const { data } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  return (
    <div className={pathname != "/auth" ? navbar : authNavbar}>
      <Link to={"/"}>
        <img
          src={memoriesTitle}          
          className="transition ease-in-out duration-100 hover:scale-110 cursor-pointer w-[250px]"
        />
      </Link>

      {pathname != "/auth" &&
        (data ? (
          <div className="flex items-center gap-10">
            <img className="hover:scale-110 cursor-pointer transition-all duration-100 ease-in-out rounded-full w-12" src={data.photoUrl!} />
            <p className="text-black font-bold">{data.displayName}</p>
            <button
              onClick={(e) => dispatch(logOut())}
              className="bg-[#f50057] transition ease-in-out duration-100 hover:scale-110 shadow-button px-4 py-2 rounded-md font-bold"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link to={"/auth"}>
            <button className="bg-[#f50057] transition ease-in-out duration-100 hover:scale-110 shadow-button px-4 py-2 rounded-md font-bold">
              Sign In
            </button>
          </Link>
        ))}
    </div>
  );
}

export default NavBar;
