import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3002/register", {
        name: username,
        password: password,
      });
      if(response.data === 'User registered'){
        alert(response.data + "! Press OK to redirect to login page");
        window.location.href = "/SignIn"
      }else{
        alert(response.data);
      }
    } catch (error) {
      alert("Error registering");
      console.error(error);
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>

          <div className="flex">
            <p className="w-[100px]">Password:</p>
            <input
              className="ml-[10px] border-[2px] border-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>

          <div className="flex flex-col items-end">
            <button
              className="w-[70px] border-black border-[2px]"
              onClick={handleRegister}
            >
              Register
            </button>
            <div className="flex">
              <p className="text-sm">
                Already have an account? Sign in{" "}
                <Link to="/SignIn" className="text-sm text-sky-400">
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

export default RegisterPage;
