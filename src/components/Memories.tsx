import React, { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import Memory from "./Memory";
import InfiniteScroll from "react-infinite-scroller";
import { getMemories, pageUp } from "../redux/memoriesSlice";
import ReactLoading from "react-loading";

function Memories() {
  const { data, page, loading, error } = useSelector(
    (state: RootState) => state.memories
  );
  const dispatch = useAppDispatch();
  const parentDivRef = useRef(null);
  const loader = useRef(null);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      dispatch(pageUp());
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  useEffect(() => {
    if (page > 0) {
      console.log(page);
      dispatch(getMemories({ page }));
    }
  }, [page]);

  return (
    <div className="w-full px-4 overflow-auto h-[90%] flex flex-col relative">
      <div className="w-full flex-wrap flex">
        {data && data.map((data, index) => <Memory data={data} key={index} />)}
      </div>
      <div className="flex w-full justify-center p-2 flex-col items-center">
        {loading == "pending" && (
          <ReactLoading
            className="flex items-center justify-center "
            type={"spin"}
            color={"#f50057"}
            height={125}
            width={62}
          />
        )}

        {error == 404 && <p>There is no more Memory!</p>}
      </div>
      <div ref={loader} />
    </div>
  );
}

export default Memories;
