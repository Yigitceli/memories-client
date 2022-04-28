import React from "react";
import Create from "./Create";
import Search from "./Search";

interface IProps{
  search:string;
  setSearch: (e:string) => void
}

const Form:React.FC<IProps> = ({search, setSearch}) => {
  return (
    <div className="w-[24rem] flex flex-col gap-3 p-3 shrink-0">
      <Search search={search} setSearch={setSearch}/>
      <Create />
    </div>
  );
}

export default Form;
