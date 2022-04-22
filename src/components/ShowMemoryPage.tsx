import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { FaRegSadTear } from "react-icons/fa";
import ReactLoading from "react-loading";

interface IProps {
  children: React.ReactNode;
}

const ShowMemoryPage: React.FC<IProps> = ({ children }) => {
  const { error, loading } = useSelector((state: RootState) => state.memory);
  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col gap-3">
        <FaRegSadTear className="w-32 h-32" />
        <p className="text-xl">Can't Find The Memory</p>
      </div>
    );
  }
  if (loading == "pending") {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <ReactLoading
          className="flex items-center justify-center "
          type={"spin"}
          color={"#f50057"}
          height={350}
          width={125}
        />
      </div>
    );
  }
  return <>{children}</>;
};

export default ShowMemoryPage;
