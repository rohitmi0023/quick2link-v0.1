import React, { Fragment } from "react";
import "./userProfileData.css";
import UserDataDetails from "./UserDataDetails";
import UserAccountDetails from "./UserAccountDetails";

const UserProfileData = () => {
    return (
        <Fragment>
            <UserDataDetails />
            <br />
            <UserAccountDetails />)
        </Fragment>
    );
};

export default UserProfileData;
