import React from "react";
import testImage from "../assets/bg-image.jpg";
import { BiLike } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import Img from 'react-cool-img'


function Memory() {
  return (
    <div className="shadow-final bg-white rounded-2xl h-96 w-[19rem] flex flex-col cursor-pointer hover:scale-105 ease-in-out translate-all duration-100">
      <div className="object-cover overflow-hidden w-full rounded-t-2xl h-40 object-center relative">
        <img src={testImage} className="absolute z-10"/>
        <div className="z-20 w-full h-full absolute text-white bg-opacity p-4 flex justify-between">
          <div>
            <p className="font-bold text-lg">Javascript Mastery</p>
            <p className="text-sm">6 hours ago</p>
          </div>
          <BsThreeDots className="text-white hover:scale-110 ease-in-out translate-all duration-100" fontSize={24} cursor='pointer'/>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-3">
        <div className="flex gap-2 text-slate-500">
          <span>asdasd</span>
          <span>asdasd</span>{" "}
        </div>
        <h2 className="text-2xl font-semibold">Test Title</h2>
        <p className="w-full">
          If you are planning to aslkdjaslkdj asdlkjasd alskdja lk. asljkdas
          lkjasda. alskdjaaldskja aklsjda aslkdja asdlkj
        </p>
        <div className="w-full flex justify-between">
          <button className="flex  items-center gap-1 font-semibold text-md text-blue-500 ease-in-out translate-all duration-100 hover:scale-105">
            <BiLike fontSize={18} />1 LIKE
          </button>
          <button className="text-md flex items-center font-semibold  gap-1 text-[#f50057] ease-in-out translate-all duration-100 hover:scale-105">
            <AiFillDelete fontSize={18} />
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Memory;
