import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Form from "../components/Form";
import Memories from "../components/Memories";
import { getMemories } from "../redux/memoriesSlice";
import { RootState, useAppDispatch } from "../redux/store";
import { FaRegSadTear } from "react-icons/fa";
import ShowMemories from "../components/ShowMemories";
import { useLocation } from "react-router-dom";
import Search from "../components/Search";
import Create from "../components/Create";

function Dashboard() {
  const dispatch = useAppDispatch();
  const { page } = useSelector((state: RootState) => state.memories);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showCreate, setShowCreate] = useState<boolean>(false);

  return (
    <div className="w-full flex md:flex-row flex-col h-full md:overflow-hidden">
      <div className="w-full flex p-4 justify-between md:hidden">
        <button
          onClick={(e) => {
            setShowSearch(!showSearch);
            setShowCreate(false);
          }}
          className="bg-secondary hover:scale-105 transition-all ease-in-out duration-100 rounded-lg w-36 p-1"
        >
          Search
        </button>
        <button
          onClick={(e) => {
            setShowCreate(!showCreate);
            setShowSearch(false);
          }}
          className="bg-secondary hover:scale-105 transition-all ease-in-out duration-100 rounded-lg w-36 p-1"
        >
          Create
        </button>
      </div>
      {showSearch && <div className="md:hidden"><Search search={search} setSearch={setSearch} /></div>}
      {showCreate && (
        <div className="min-h-full w-full md:hidden">
          <Create />
        </div>
      )}
      <Memories search={search} />
      <Form setSearch={setSearch} search={search} />
    </div>
  );
}

export default Dashboard;
