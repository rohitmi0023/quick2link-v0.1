import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";

export const UserProfileContext = createContext();

export const UserProfileProvider = props => {
    const [userInfo, setUserInfo] = useState([]);
    const getUserInfo = () => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "x-auth-token": `${token}`,
                "Content-Type": "application/json"
            }
        };
        Axios.get("/api/auth", config).then(res => {
            setUserInfo([res.data]);
        });
    };
    useEffect(() => {
        getUserInfo();
    }, []);
    return (
        <UserProfileContext.Provider value={[userInfo, setUserInfo]}>
            {props.children}
        </UserProfileContext.Provider>
    );
};
