import React from "react";
import Create from "./Create";
import Search from "./Search";

function Form() {
  return (
    <div className="w-[24rem] flex flex-col gap-3 p-3 shrink-0">
      <Search />
      <Create />
    </div>
  );
}

export default Form;
