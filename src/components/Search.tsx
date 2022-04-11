import React from "react";

function Search() {
  return (
    <form className="bg-white w-full min-h-24 rounded-md shadow-final p-2 flex flex-col gap-3">
      <input placeholder="Search Memories" className="p-2 border-2 border-slate-400 rounded-lg "/>
      <input placeholder="Search Tags" className="p-2 border-2 border-slate-400 rounded-lg"/>
      <button className="w-full bg-blue-800 rounded-lg p-1 hover:scale-95 text-white ease-in-out transition-all duration-100">Search</button>
    </form>
  );
}

export default Search;
