import React from "react";

import { useForm, SubmitHandler } from "react-hook-form";

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
        placeholder="First Name"
        {...(register("first"), { required: true })}
      />
      <input
        className="w-full border-2 p-2"
        placeholder="Last Name"
        {...(register("last"), { required: true })}
      />
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
      <input
        className="w-full border-2 p-2"
        placeholder="Verify Password"
        type={"password"}
        {...register("passwordVerify", { required: true })}
      />

      <button className="transition ease-in-out duration-100 w-24 bg-red-400 p-2 rounded-md font-bold hover:scale-105">
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
