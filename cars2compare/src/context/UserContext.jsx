import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
        try{
            const decodedUser = jwtDecode(token);
            setUser({ username: decodedUser.name, token});
        }catch(error){
            console.error('Invalid token', error);
            localStorage.removeItem('token');
        }
    }
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:3002/login' , {
                name: username,
                password: password
            });

            const token = response.data.token;
            console.log(token);
            localStorage.setItem('token', token);
            const decodedUser = jwtDecode(token);
            setUser({ username: decodedUser.name, token });
            return { success: true, message: 'Login successful' };
        }catch(error){
            console.error(error);
            return{success: false, message: 'Login failed'};
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return(
        <UserContext.Provider value={{ user, login, logout}}>
            {children}
        </UserContext.Provider>
    );
};