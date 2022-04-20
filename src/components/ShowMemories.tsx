import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { FaRegSadTear } from "react-icons/fa";
import ReactLoading from "react-loading";

interface IProps {
  children: React.ReactNode;
}

const ShowMemories: React.FC<IProps> = ({ children }) => {
  const { page, error, loading, data } = useSelector(
    (state: RootState) => state.memories
  );

  return (
    <>
      {(error == 404 || error == 500 ) && (
        <div className=" w-full px-4 flex justify-center items-center flex-col gap-2">
          <FaRegSadTear fontSize={32} />
          <span>Memories can not be found!</span>
        </div>
      )}
      {!error && loading == "pending" && (
        <div className=" w-full px-4 flex justify-center items-center flex-col gap-2">
          <ReactLoading
            className="flex items-center justify-center "
            type={"spin"}
            color={"#f50057"}
            height={250}
            width={125}
          />
        </div>
      )}
      {!error && loading == "success" && children}
    </>
  );
};

export default ShowMemories;
