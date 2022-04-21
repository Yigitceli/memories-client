import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Form from "../components/Form";
import Memories from "../components/Memories";
import { getMemories } from "../redux/memoriesSlice";
import { RootState, useAppDispatch } from "../redux/store";
import { FaRegSadTear } from "react-icons/fa";
import ShowMemories from "../components/ShowMemories";

function Dashboard() {
  const dispatch = useAppDispatch();
  const { page, error, loading } = useSelector(
    (state: RootState) => state.memories
  );

  useEffect(() => {
    dispatch(getMemories({ page }));
  }, []);

  return (
    <div className="w-full flex h-full overflow-hidden">
      <Memories />
      <Form />
    </div>
  );
}

export default Dashboard;
