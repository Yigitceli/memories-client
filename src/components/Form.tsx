import React from "react";
import Create from "./Create";
import Search from "./Search";
import { BiArrowFromRight } from "react-icons/bi";

interface IProps {
  search: string;
  setSearch: (e: string) => void;
}

const Form: React.FC<IProps> = ({ search, setSearch }) => {
  return (
    <>
      <div className="hidden md:flex w-[24rem] flex-col gap-3 p-3 shrink-0">
        <Search search={search} setSearch={setSearch} />
        <Create />
      </div>      
      
    </>
  );
};

export default Form;
