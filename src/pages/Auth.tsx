import { useState } from "react";
import { AiTwotoneLock } from "react-icons/ai";
import { useForm, SubmitHandler } from "react-hook-form";
import Login from "../components/Login";
import Register from "../components/Register";

type Inputs = {
  email: string;
  password: string;
};

function Auth() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="opacity-80 bg-center bg-no-repeat bg-cover bg-bg-image absolute w-full h-screen left-0 top-0 z-0"></div>
      <div className="rounded-md relative w-96 bg-white min-h-[28em] items-center p-4 flex flex-col gap-3">
        <div className="w-12 h-12 bg-red-400 rounded-full flex justify-center items-center">
          <AiTwotoneLock fontSize={36} />
        </div>
        {isLogin ? (
          <Login setIsLogin={setIsLogin} />
        ) : (
          <Register setIsLogin={setIsLogin} />
        )}
      </div>
      
    </div>
  );
}

export default Auth;
