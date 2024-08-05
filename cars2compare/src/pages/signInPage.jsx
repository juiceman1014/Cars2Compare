import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(UserContext);

  //allows user to log in
  const handleLogin = async () => {
    const result = await login(username, password);
    if (result.success) {
      alert("Login successful! Press OK to redirect to home page");
      window.location.href = "/";
    } else {
      alert(result.message);
    }
  };

  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <div className="flex flex-col w-auto p-[20px] h-[400px] border-[2px] border-black justify-center justify-around">
          <div className="flex">
            <p className="w-[100px]">Username: </p>
            <input
              className="ml-[10px] border-[2px] border-black"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>

          <div className="flex">
            <p className="w-[100px]">Password:</p>
            <input
              className="ml-[10px] border-[2px] border-black"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>

          <div className="flex flex-col items-end">
            <button
              className="w-[50px] border-black border-[2px]"
              onClick={handleLogin}
            >
              Login
            </button>
            <div className="flex">
              <p className="text-sm">
                Don't have an account yet? Sign up{" "}
                <Link to="/Register" className="text-sm text-sky-400">
                  here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
