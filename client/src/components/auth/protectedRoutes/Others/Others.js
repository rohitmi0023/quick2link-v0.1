import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import AuthNavBar from "../../../layout/AuthNavBar";
import "./index.css";
import OthersForm from "./OthersForm";
import OthersList from "./OthersList";

const Others = props => {
    if (props.isAuth === false) {
        return <Redirect to="/forbidden" />;
    }
    return (
        <Fragment>
            <AuthNavBar />
            <OthersForm />
            <OthersList />
        </Fragment>
    );
};

export default Others;
