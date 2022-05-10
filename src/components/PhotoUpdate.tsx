import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import { useSelector } from "react-redux";
import { usersRef } from "../firebaseSetup";
import { RootState, useAppDispatch } from "../redux/store";
import axiosAuth from "../AxiosAuth";
import { setProfilPhoto } from "../redux/userSlice";

interface IProps {
  setIsOpen: (v: boolean) => void;
}

const PhotoUpdate: React.FC<IProps> = ({ setIsOpen }) => {
  const [preview, setPreview] = useState<null | string>(null);
  const { data } = useSelector((state: RootState) => state.user);
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const objectUrl = URL.createObjectURL(e.target.files![0]);
    setPreview(objectUrl);
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      const uploadTask = uploadBytesResumable(usersRef(data?.userId!), file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            try {
              await axiosAuth.put("user/profil-photo", {
                photoUrl: downloadURL,
              });
              dispatch(setProfilPhoto(downloadURL));
            } catch (error) {
              console.log(error);
            }
          });
        }
      );
    }
  };

  return (
    <div className="bg-opacity top-0 left-0 absolute z-50 w-full h-full flex items-center justify-center">
      <form
        onSubmit={submitHandler}
        className="flex-col  gap-5 w-96 h-96 bg-white p-2 flex items-center justify-center shadow-final rounded-lg relative"
      >
        <GrClose
          onClick={(e) => setIsOpen(false)}
          className="font-semibold cursor-pointer absolute right-5 top-5 text-xl hover:scale-110 transition-all duration-100 ease-in-out"
        />
        <h2 className="font-semibold text-lg">Update your Photo</h2>
        <label
          className="w-56 h-56 bg-[#ffdebd] flex items-center justify-center rounded-lg relative"
          htmlFor="imageInput"
        >
          <input
            type={"file"}
            accept="image/*"
            id="imageInput"
            className="opacity-0 absolute w-full h-full cursor-pointer"
            onChange={handleFileChange}
          />
          {preview ? (
            <img src={preview} className="max-w-full max-h-full" />
          ) : (
            <div className="p-2 w-full h-full">
              <div className="w-full h-full border-dotted border-2 border-slate-700 flex items-center justify-center">
                <p className="text-slate-500 font-medium">Upload a Image</p>
              </div>
            </div>
          )}
        </label>
        <button
          type="submit"
          className="bg-secondary p-2 w-80 rounded-lg hover:scale-105 ease-in-out transition-all duration-100 font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PhotoUpdate;
