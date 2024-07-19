import React from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
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
            <button className="w-[70px] border-black border-[2px]">
              Register
            </button>
            <div className="flex">
              <p className="text-sm">
                Already have an account? Sign in{" "}
                <Link to = "/SignIn" className="text-sm text-sky-400">here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
