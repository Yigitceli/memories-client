import React from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import googleIcon from "../assets/google.svg";

type Inputs = {
  email: string;
  password: string;
};

interface IProps {
  setIsLogin: (e: boolean) => void;
}

const Login: React.FC<IProps> = ({ setIsLogin }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="gap-8 p-2 w-full flex flex-col justify-around items-center"
    >
      <input
        className="w-full border-2 p-2"
        placeholder="Email"
        {...(register("email"), { required: true })}
      />

      <input
        className="w-full border-2 p-2"
        placeholder="Password"
        type={"password"}
        {...register("password", { required: true })}
      />

      <button className="transition ease-in-out duration-100 w-24 bg-red-400 p-2 rounded-md font-bold hover:scale-105">
        Sign In
      </button>
      <p>
        You don't have an account!{" "}
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
      <button className="transition ease-in-out duration-100 hover:scale-105 w-full h-8 shadow-final flex justify-center items-center p-5 rounded-md">
        <img src={googleIcon} width="24px" height="24px" />
      </button>
    </form>
  );
};

export default Login;
