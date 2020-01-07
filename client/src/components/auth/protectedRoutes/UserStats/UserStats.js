import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import "./userStats.css";
import AuthNavBar from "../../../layout/AuthNavBar";
import ListTotal from "./ListTotal";

const UserStats = props => {
    if (props.isAuth === false) {
        return <Redirect to="/forbidden" />;
    }
    return (
        <Fragment>
            <AuthNavBar />
            <ListTotal />
        </Fragment>
    );
};

export default UserStats;
