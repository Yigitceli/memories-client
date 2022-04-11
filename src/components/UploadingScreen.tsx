import React from "react";
import ReactLoading from "react-loading";

interface IProps {
  progress: null | number;
}

const UploadingScreen: React.FC<IProps> = ({ progress }) => {
  return (
    <div className="fixed inset-0 w-screen h-screen flex justify-center items-center bg-opacity z-50 flex-col">
      <ReactLoading
        className="flex items-center justify-center "
        type={"spin"}
        color={"#f50057"}
        height={350}
        width={125}
      />
      <div className=" w-2/4 flex justify-center items-center flex-col gap-2">
        <span className="text-3xl font-semibold">Image is uploading.</span>
        <div className="w-full h-5 bg-slate-700 rounded-lg relative">
          <div className="w-full h-full absolute inset-0 flex justify-center items-center text-white font-semibold ">
            <span>{progress?.toFixed(0)}%</span>
          </div>
          <div
            style={{ width: `${progress}%` }}
            className={`bg-secondary h-full`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default UploadingScreen;
