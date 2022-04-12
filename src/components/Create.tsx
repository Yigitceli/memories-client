import React, { useState } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import "../reactTagInput.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../redux/store";
import { postMemory } from "../redux/memoriesSlice";
import { InputData } from "../types";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { memoriesRef } from "../firebaseSetup";
import { useNavigate } from "react-router-dom";
import UploadingScreen from "./UploadingScreen";

type Inputs = {
  title: string;
  message: string;
  image: FileList;
};

const inputClass = "w-full p-2 border-2 border-slate-400 rounded-lg";
const errorInputClass =
  "w-full p-2 border-2 border-red-700 rounded-lg outline-red-700";

const textAreaClass =
  "w-full p-2 border-2 border-slate-400 rounded-lg h-32 resize-none";
const errorTextAreaClass =
  "w-full p-2 border-2 border-red-700 rounded-lg h-32 resize-none";

const fileInputClass =
  "w-full h-full border-dotted border-2 border-slate-700 flex items-center justify-center";
const errorFileInputClass =
  "w-full h-full border-dotted border-2 border-red-700 flex items-center justify-center";

const tagsInputClass = "w-full border-2 border-slate-400 rounded-lg";
const errorTagsInputClass = "w-full border-2 border-red-700 rounded-lg";

function Create() {
  const [tagsError, setTagsErros] = useState<boolean>(false);
  const [preview, setPreview] = useState<null | string>(null);
  const [uploading, setUploading] = useState<null | number>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const objectUrl = URL.createObjectURL(e.target.files![0]);
    setPreview(objectUrl);
  };

  const onClick = () => {
    setTags(["Example Tag"]);
    setPreview(null);
    reset();
    clearErrors();
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (tags.length < 1) {
      setTagsErros(true);
    } else {
      const uploadTask = uploadBytesResumable(
        memoriesRef(data.title),
        data.image[0]
      );
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploading(progress);
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
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const imageUrl = downloadURL;
            const finalData: InputData = {
              image: imageUrl,
              message: data.message,
              tags: tags,
              title: data.title,
            };
            dispatch(postMemory(finalData));
            setTagsErros(false);
            reset();
            setTags(["Example Tag"]);
            setUploading(null);
            setPreview(null);
          });
        }
      );
    }
  };

  const [tags, setTags] = React.useState<string[]>(["Example Tag"]);
  return (
    <form
      className="flex bg-white w-full min-h-42 shadow-final flex-col text-center p-2 gap-3 rounded-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      {uploading != null && <UploadingScreen progress={uploading} />}
      <h2 className="text-lg font-semibold">Creating a Memory</h2>
      <input
        className={errors.title ? errorInputClass : inputClass}
        placeholder="Title"
        {...register("title", { required: true, minLength: 2 })}
      />
      <textarea
        className={errors.message ? errorTextAreaClass : textAreaClass}
        placeholder="Message"
        {...register("message", { required: true, minLength: 8 })}
      ></textarea>
      <div className={tagsError ? errorTagsInputClass : tagsInputClass}>
        <ReactTagInput
          tags={tags}
          onChange={(newTags) => setTags(newTags)}
          placeholder="Tags, type and press enter"
          editable={true}
          readOnly={false}
          removeOnBackspace={true}
        />
      </div>
      <div className="flex w-full items-center justify-center">
        <label
          className="w-56 h-56 bg-[#ffdebd] flex items-center justify-center rounded-lg relative"
          htmlFor="imageInput"
        >
          <input
            type={"file"}
            id="imageInput"
            className="opacity-0 absolute w-full h-full cursor-pointer"
            {...register("image", { required: true })}
            onChange={handleFileChange}
          />
          {preview ? (
            <img src={preview} className="max-w-full max-h-full" />
          ) : (
            <div className="p-2 w-full h-full">
              <div
                className={errors.image ? errorFileInputClass : fileInputClass}
              >
                <p className="text-slate-500 font-medium">
                  {errors.image ? "You must upload a image" : "Upload a Image"}
                </p>
              </div>
            </div>
          )}
        </label>
      </div>

      <button
        type="submit"
        className="w-full p-2 text-white bg-blue-800 rounded-lg hover:scale-95 ease-in-out transition-all duration-100"
      >
        SUBMIT
      </button>
      <button
        type="reset"
        onClick={onClick}
        className="w-full p-[0.1em] text-white bg-[#f50057] rounded-lg hover:scale-95 ease-in-out transition-all duration-100"
      >
        CLEAR
      </button>
    </form>
  );
}

export default Create;
