import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import googleIcon from "../assets/google.svg";
import { RootState, useAppDispatch } from "../redux/store";
import { login, setError } from "../redux/userSlice";
import { ILoginBody } from "../types";

type Inputs = {
  email: string;
  password: string;
};

interface IProps {
  setIsLogin: (e: boolean) => void;
}

const Login: React.FC<IProps> = ({ setIsLogin }) => {
  const { error } = useSelector((state: RootState) => state.user);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setError());
  }, []);

  const clickHandler = async (authType: "custom" | "google") => {
    dispatch(login({ authType }));
  };

  const onSubmit: SubmitHandler<Inputs> = (data: ILoginBody) =>
    dispatch(login({ authType: "custom", data }));
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="gap-8 p-2 w-full flex flex-col justify-around items-center"
    >
      {errors.email?.type == "required" && (
        <p className="text-red-700 font-bold w-full text-left text-sm">
          *Email is required.
        </p>
      )}
      {errors.email?.type == "pattern" && (
        <p className="text-red-700 font-bold w-full text-left text-sm">
          *Please type a valid email.
        </p>
      )}
      <input
        className={
          errors.email
            ? "placeholder:text-red-700 w-full border-2 p-2 border-red-700 outline-red-700"
            : "w-full border-2 p-2"
        }
        placeholder="Email"
        {...register("email", {
          required: true,
          pattern:
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        })}
      />

      {errors.password?.type == "required" && (
        <p className="text-red-700 font-bold w-full text-left text-sm">
          *Password is required.
        </p>
      )}

      <input
        className={
          errors.password
            ? "placeholder:text-red-700 w-full border-2 p-2 border-red-700 outline-red-700"
            : "w-full border-2 p-2"
        }
        placeholder="Password"
        type={"password"}
        {...register("password", {
          required: true,
        })}
      />
      {error === 401 && (
        <p className="text-red-700 font-bold w-full text-left text-sm">
          *Email or password is wrong!
        </p>
      )}
      {error === 500 && (
        <p className="text-red-700 font-bold w-full text-left text-sm">
          *Something gone wrong! Try again later!
        </p>
      )}

      <button
        type="submit"
        className="transition ease-in-out duration-100 w-24 bg-red-400 p-2 rounded-md font-bold hover:scale-105"
      >
        Sign In
      </button>
      <p>
        You don't have an account!
        <strong
          onClick={(e) => setIsLogin(false)}
          className="text-red-400 decoration-solid underline cursor-pointer"
        >
          Sign Up!
        </strong>
      </p>
      <div className="w-full">
        <hr className="overflow-visible after:content-['§'] after:px-4 after:bg-[#fff] after:relative after:top-[-13px] h-[5px] border-double border-t-[3px] border-black text-center" />
      </div>
      <button
        onClick={(e) => clickHandler("google")}
        className="transition ease-in-out duration-100 hover:scale-105 w-full h-8 shadow-final flex justify-center items-center p-5 rounded-md"
      >
        <img src={googleIcon} width="24px" height="24px" />
      </button>
    </form>
  );
};

export default Login;
