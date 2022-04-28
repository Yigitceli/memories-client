import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Form from "../components/Form";
import Memories from "../components/Memories";
import { getMemories } from "../redux/memoriesSlice";
import { RootState, useAppDispatch } from "../redux/store";
import { FaRegSadTear } from "react-icons/fa";
import ShowMemories from "../components/ShowMemories";
import { useLocation } from "react-router-dom";

function Dashboard() {
  const dispatch = useAppDispatch();
  const { page } = useSelector((state: RootState) => state.memories);
  const [search, setSearch] = useState("")

  return (
    <div className="w-full flex h-full overflow-hidden">
      <Memories search={search}/>
      <Form setSearch={setSearch} search={search}/>
    </div>
  );
}

export default Dashboard;
