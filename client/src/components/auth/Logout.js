import React, { useContext } from "react";
import { UserProfileContext } from "./protectedRoutes/Home/UserProfileContext";

const Logout = () => {
    const [setUserInfo] = useContext(UserProfileContext);
    localStorage.removeItem("token");
    const handleSubmit = () => {
        setUserInfo([]);
    };
    return <button onClick={handleSubmit}>Log Out</button>;
};

export default Logout;
