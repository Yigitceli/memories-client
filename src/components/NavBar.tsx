import memoriesTitle from "../assets/title.png";
import { useLocation, Link } from "react-router-dom";

const authNavbar =
  "relative my-4 z-10 bg-white py-2 px-14 text-white flex items-center shadow-final w-full rounded-lg justify-center";
const navbar =
  "relative my-4 z-10 bg-white py-2 px-14 text-white flex items-center shadow-final w-full rounded-lg justify-between";

function NavBar() {
  const pathname = useLocation().pathname;

  return (
    <div className={pathname != "/auth" ? navbar : authNavbar}>
      <Link to={"/"}>
        <img
          src={memoriesTitle}
          width="250px"
          className="transition ease-in-out duration-100 hover:scale-110 cursor-pointer"
        />
      </Link>

      {pathname != "/auth" && (
        <Link to={"/auth"}>
          <button className="bg-[#f50057] transition ease-in-out duration-100 hover:scale-110 shadow-button px-4 py-2 rounded-md font-bold">
            Sign In
          </button>
        </Link>
      )}
    </div>
  );
}

export default NavBar;
