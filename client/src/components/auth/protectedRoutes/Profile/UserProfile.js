import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import AuthNavBar from "../../../layout/AuthNavBar";
import UserProfileData from "./UserProfileData";

const UserProfile = props => {
    if (props.isAuth === false) {
        return <Redirect to="/forbidden" />;
    }
    return (
        <Fragment>
            <AuthNavBar />
            <br />
            <UserProfileData />
        </Fragment>
    );
};

export default UserProfile;
