import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import AuthNavBar from "../../../layout/AuthNavBar";
import "./index.css";
import SocialForm from "./SocialForm";
import SocialList from "./SocialList";

const Social = props => {
    if (props.isAuth === false) {
        return <Redirect to="/forbidden" />;
    }
    return (
        <Fragment>
            <AuthNavBar />
            <SocialForm />
            <SocialList />
        </Fragment>
    );
};

export default Social;
