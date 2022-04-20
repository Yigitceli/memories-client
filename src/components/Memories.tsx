import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Memory from "./Memory";

function Memories() {
  const { data } = useSelector((state: RootState) => state.memories);
  return (
    <div className="w-full px-4 flex flex-wrap h-full overflow-auto">
      {data && data.map((data) => <Memory data={data} />)}
    </div>
  );
}

export default Memories;
