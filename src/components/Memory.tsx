import React, { useMemo } from "react";
import testImage from "../assets/bg-image.jpg";
import { BiLike } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import Img from "react-cool-img";
import { IMemory } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface IProps {
  data: IMemory;
}

const Memory: React.FC<IProps> = ({ data }) => {
  const userData = useSelector((state: RootState) => state.user.data);

  const checkLiked = useMemo(
    () => data.like.some((user) => user.userId == userData?.userId),
    [data]
  );

  return (
    <div className="shadow-final m-3 bg-white rounded-2xl h-96 w-[19rem] flex flex-col cursor-pointer hover:scale-105 ease-in-out translate-all duration-100">
      <div className="object-cover overflow-hidden w-full rounded-t-2xl h-40 object-center relative">
        <img src={data.memoryPhotoUrl} className="absolute z-10" />

        <div className="z-20 w-full h-full absolute text-white bg-opacity p-4 flex justify-between">
          <div>
            <p className="font-bold text-lg">{data.author.displayName}</p>
            <p className="text-sm">
              {new Date(data.createdAt.toString()).toUTCString()}
            </p>
          </div>
          <BsThreeDots
            className="text-white hover:scale-110 ease-in-out translate-all duration-100"
            fontSize={24}
            cursor="pointer"
          />
        </div>
      </div>
      <div className="p-5 flex flex-col gap-3 w-full">
        <div className="flex gap-2 text-slate-500">
          {data.tags.map((tag, index) => (
            <span key={index}>#{tag}</span>
          ))}
        </div>
        <h2 className="text-2xl font-semibold">{data.memoryTitle}</h2>
        <p className="w-full h-20 text-clip break-words overflow-hidden">
          {data.memoryMessage}
        </p>
        <div className="w-full flex justify-between">
          <button className="flex  items-center gap-1 font-semibold text-md text-blue-500 ease-in-out translate-all duration-100 hover:scale-105">
            {checkLiked ? (
              <AiFillLike fontSize={18} />
            ) : (
              <BiLike fontSize={18} />
            )}
            {data.like.length} LIKE
          </button>
          {data.author.userId == userData?.userId && (
            <button className="text-md flex items-center font-semibold  gap-1 text-[#f50057] ease-in-out translate-all duration-100 hover:scale-105">
              <AiFillDelete fontSize={18} />
              DELETE
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Memory;
