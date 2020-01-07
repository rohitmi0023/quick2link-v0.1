import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import AuthNavBar from "../../../layout/AuthNavBar";
import "./index.css";
import SportsForm from "./SportsForm";
import SportsList from "./SportsList";

const Sports = props => {
    if (props.isAuth === false) {
        return <Redirect to="/forbidden" />;
    }
    return (
        <Fragment>
            <AuthNavBar />
            <SportsForm />
            <SportsList />
        </Fragment>
    );
};

export default Sports;
