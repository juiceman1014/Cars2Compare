import React, { createContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

//creating a user context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const timeoutRef = useRef(null);

  //allows use to keep a user signed in after a the page is closed or refreshed
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser({ id: decodedUser.id, username: decodedUser.name, token });

        const tokenExpirationTime = decodedUser.exp * 1000 - Date.now();
        timeoutRef.current = setTimeout(() => {
          alert("Your session has expired. Press OK to logout");
          logout();
        }, tokenExpirationTime);
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token");
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  //function for user to be able to sign in
  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:3002/login", {
        name: username,
        password: password,
      });

      const token = response.data.token;
      console.log(token);
      localStorage.setItem("token", token);
      const decodedUser = jwtDecode(token);
      setUser({ id: decodedUser.id, username: decodedUser.name, token });
      return { success: true, message: "Login successful" };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Login failed" };
    }
  };

  //function for user to be able to log out
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    alert("Logout successful! Press OK to redirect to homepage");
    window.location.href = "/";
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
