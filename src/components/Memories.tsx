import React, { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import Memory from "./Memory";
import InfiniteScroll from "react-infinite-scroller";
import { getMemories, pageUp } from "../redux/memoriesSlice";
import ReactLoading from "react-loading";
import { useLocation } from "react-router-dom";

interface IProps {
  search: string;
}

const Memories: React.FC<IProps> = ({ search }) => {
  const { data, page, loading, error } = useSelector(
    (state: RootState) => state.memories
  );
  const location = useLocation();

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
    if (location.search) {
      dispatch(getMemories({ page, search: location.search.slice(8) }));
    }
  }, [page, location.search]);

  useEffect(() => {
    if (!location.search) {
      dispatch(getMemories({ page }));
    }
  }, [page, location.key]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="w-full px-4 overflow-auto h-full flex flex-col relative">
      <p className="my-2 text-lg font-bold w-full text-center">Scroll Down To Fetch More</p>
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

        {error && <p>There is no more Memory!</p>}
        <div ref={loader} />
      </div>
    </div>
  );
};

export default Memories;
