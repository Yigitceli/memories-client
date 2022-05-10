import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthInstance from "../AxiosAuth";
import ShowMemoryPage from "../components/ShowMemoryPage";
import { fetchMemory } from "../redux/memoryPageSlice";
import { RootState, useAppDispatch } from "../redux/store";
import { IComment } from "../types";

type Inputs = {
  comment: string;
};

const MemoryPage = () => {
  const id = useLocation().pathname.slice(1);
  const dispatch = useAppDispatch();
  const { error, loading, data } = useSelector(
    (state: RootState) => state.memory
  );
  const userData = useSelector((state: RootState) => state.user.data);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  useEffect(() => {    
    dispatch(fetchMemory({ id }));
  }, [id]);

  const onSubmit: SubmitHandler<Inputs> = async (inputData) => {
    try {
      if (!userData) {
        navigate("/auth");
      } else {
        const comment = inputData.comment;
        const response = await AuthInstance.post(
          `/memory/${data?._id}/comment`,
          {
            comment,
          }
        );
        reset();
        document.location.reload();
      }
    } catch (error) {}
  };

  return (
    <div className="w-full h-[90%] md:p-4 p-2 ">
      <div className="shadow-final w-full md:h-full sm:min-h-full md:overflow-hidden rounded-3xl flex flex-col">
        <ShowMemoryPage>
          <div className="w-full p-4 flex gap-2 md:flex-row flex-col-reverse">
            <div className="md:w-1/2 w-full md:h-full flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold text-4xl">{data?.memoryTitle}</h1>
                <div className="flex w-full text-slate-500">
                  {data?.tags.map((tag: string, index) => {
                    return <span key={index} >#{tag}&nbsp;</span>;
                  })}
                </div>
                <p>{data?.memoryMessage}</p>
                <p className="font-semibold text-lg">
                  Created by: {data?.author.displayName}
                </p>
                <p>
                  {new Date(data?.createdAt.toString() as string).toUTCString()}
                </p>
                <hr className="my-2" />
                <p className="font-bold">Realtime Chat - coming soon!</p>
                <hr className="my-2" />
                <div className="w-full md:h-[150px] h-[350px] flex gap-2 md:flex-row flex-col">
                  <div className="md:w-1/2 w-full  h-full overflow-auto gap-2">
                    {data?.comments.map((comment: IComment, index) => {
                      return (
                        <div className="flex flex-col w-full" key={index}>
                          <div className="w-full flex gap-2 items-center font-semibold">
                            <img
                              src={comment.photoUrl}
                              className="rounded-full w-10"
                            />
                            <span>{comment.displayName}</span>
                          </div>
                          <p className="break-words">{comment.comment}</p>
                          <hr className="w-full my-1" />
                        </div>
                      );
                    })}
                  </div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="md:w-1/2 w-full h-full gap-2 flex flex-col "
                  >
                    <p className="text-xl">Write a comment</p>
                    <textarea
                      placeholder="Comment"
                      className="resize-none w-full h-full border-[0.1em] border-solid border-slate-500 px-2"
                      {...register("comment", { required: true })}
                    ></textarea>
                    <button className="transition-all ease-in-out duration-100 hover:scale-105 text-white w-full p-2 flex items-center justify-center rounded-md bg-slate-600">
                      Send Comment
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <img src={data?.memoryPhotoUrl} className="md:w-1/2  "/>
            
          </div>
          <div className="w-full flex flex-col p-3 gap-2 overflow-auto">
            <p className="text-xl">You might also like:</p>
            <hr className="my-1 w-full" />
            <div className="h-full gap-2 overflow-auto w-full flex flex-col">
              {data?.likeMemories.map((memory) => (
                <Link key={memory._id} to={`/${memory._id}`}>
                  <div className="w-full flex flex-col gap-1 ">
                    <h2 className="font-semibold">{memory.memoryTitle}</h2>
                    <p>{memory.author.displayName}</p>
                    <p>{memory.memoryMessage}</p>
                    <p>Likes: {memory.like.length}</p>
                    <img className="w-44" src={memory.memoryPhotoUrl} />
                    <hr className="my-2" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </ShowMemoryPage>
      </div>
    </div>
  );
};

export default MemoryPage;
