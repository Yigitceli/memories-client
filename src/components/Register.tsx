import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { firstLetterUpperCase } from "../utils";
import { IRegisterBody } from "../types";
import { useNavigate } from "react-router-dom";

type Inputs = {
  first: string;
  last: string;
  email: string;
  password: string;
  passwordVerify: string;
};

interface IProps {
  setIsLogin: (e: boolean) => void;
}

const Register: React.FC<IProps> = ({ setIsLogin }) => {
  const [error, setError] = useState<406 | 500 | undefined>(undefined);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const displayName =
      firstLetterUpperCase(data.first) + " " + firstLetterUpperCase(data.last);
    const registerBody: IRegisterBody = {
      displayName,
      email: data.email.toLowerCase(),
      password: data.password,
      authType: "custom",
    };
    try {
      const response = await axios.post(
        "https://yigit-memories-backend.herokuapp.com/api/user/register",
        registerBody
      );
      reset();
      setIsLogin(true);
    } catch (error) {
      const err = error as AxiosError;
      const errorCode: 406 | 500 | undefined = err.response?.status as
        | 406
        | 500
        | undefined;
      setError(errorCode);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="gap-3 p-2 w-full flex flex-col justify-around items-center"
    >
      {errors.first && (
        <p className="text-red-700 font-bold w-full text-left text-sm">
          *First name is required.
        </p>
      )}
      <input
        className={
          errors.first
            ? "placeholder:text-red-700 w-full border-2 p-2 border-red-700 outline-red-700"
            : "w-full border-2 p-2"
        }
        placeholder="First Name"
        {...register("first", { required: true, maxLength: 20 })}
      />

      {errors.last && (
        <p className="text-red-700 font-bold w-full text-left text-sm">
          *Last name is required.
        </p>
      )}
      <input
        className={
          errors.last
            ? "placeholder:text-red-700 w-full border-2 p-2 border-red-700 outline-red-700"
            : "w-full border-2 p-2"
        }
        placeholder="Last Name"
        {...register("last", { required: true, maxLength: 20 })}
      />

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
      {error == 406 && (
        <p className="text-red-700 font-bold w-full text-left text-sm">
          *Email is already used.
        </p>
      )}
      <input
        className={
          errors.email || error == 406
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
      {errors.password?.type == "pattern" && (
        <p className="text-red-700 font-bold w-full text-left text-sm">
          *Password must have 8 characters and at least 1 number!
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
          pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        })}
      />

      {errors.passwordVerify?.type == "required" && (
        <p className="text-red-700 font-bold w-full text-left text-sm">
          *Password Verify is required.
        </p>
      )}
      {errors.passwordVerify?.type == "validate" && (
        <p className="text-red-700 font-bold w-full text-left text-sm">
          *{errors.passwordVerify.message}
        </p>
      )}
      <input
        className={
          errors.passwordVerify
            ? "placeholder:text-red-700 w-full border-2 p-2 border-red-700 outline-red-700"
            : "w-full border-2 p-2"
        }
        placeholder="Password Verify"
        type={"password"}
        {...register("passwordVerify", {
          required: true,
          validate: (val: string) => {
            if (watch("password") != val) {
              return "Your passwords do not match";
            }
          },
        })}
      />

      {error == 500 && (
        <p className="text-red-700 font-bold w-full text-left text-sm">
          *Something went wrong! Try again later.
        </p>
      )}

      <button
        type="submit"
        className="transition ease-in-out duration-100 w-24 bg-red-400 p-2 rounded-md font-bold hover:scale-105"
      >
        Sign Up
      </button>
      <p>
        You have an account!
        <strong
          onClick={(e) => setIsLogin(true)}
          className="text-red-400 decoration-solid underline cursor-pointer"
        >
          Sign In!
        </strong>
      </p>
    </form>
  );
};

export default Register;
