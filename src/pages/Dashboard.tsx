import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Form from "../components/Form";
import Memories from "../components/Memories";
import { getMemory } from "../redux/memoriesSlice";
import { RootState, useAppDispatch } from "../redux/store";
import { FaRegSadTear } from "react-icons/fa";
import ShowMemories from "../components/ShowMemories";

function Dashboard() {
  const dispatch = useAppDispatch();  
  const { page, error, loading } = useSelector(
    (state: RootState) => state.memories
  );

  useEffect(() => {
    dispatch(getMemory(page));
  }, []);

  return (
    <div className="w-full flex h-screen">
      <div className="w-full flex h-full">
        <ShowMemories>
          <Memories />
        </ShowMemories>
      </div>
      <Form />
    </div>
  );
}

export default Dashboard;
