import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dataReset } from "../redux/memoriesSlice";

interface IProps{
  search:string;
  setSearch: (e:string) => void
}

const Search:React.FC<IProps> = ({search, setSearch} ) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    dispatch(dataReset())
    navigate({
      pathname: '',
      search: `?search=${search}`,
    });
    setSearch("")
  };
  const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)
  return (
    <form
      onSubmit={submitHandler}
      className="md:bg-white w-full min-h-24 rounded-md md:shadow-final p-2 flex flex-col gap-3"
    >
      <input
        value={search}
        onChange={changeHandler}
        placeholder="Search Memories"
        className="p-2 border-2 border-slate-400 rounded-lg "
      />
      <button
        type="submit"
        className="w-full bg-blue-800 rounded-lg p-1 hover:scale-95 text-white ease-in-out transition-all duration-100"
      >
        Search
      </button>
    </form>
  );
}

export default Search;
