import React from "react";
import { Link } from "react-router-dom";

const SignInPage = () => {
  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <div className="flex flex-col w-auto p-[20px] h-[400px] border-[2px] border-black justify-center justify-around">
          <div className="flex">
            <p className="w-[100px]">Username: </p>
            <input className="ml-[10px] border-[2px] border-black"></input>
          </div>

          <div className="flex">
            <p className="w-[100px]">Password:</p>
            <input className="ml-[10px] border-[2px] border-black"></input>
          </div>

          <div className="flex flex-col items-end">
            <button className="w-[50px] border-black border-[2px]">
              Login
            </button>
            <div className="flex">
              <p className="text-sm">
                Don't have an account yet? Sign up{" "}
                <Link to = "/Register" className="text-sm text-sky-400">here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
