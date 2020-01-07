import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import AuthNavBar from "../../../layout/AuthNavBar";
import JumbotronComponent from "./JumbotronComponent";

const Home = props => {
    if (props.isAuth === false) {
        return <Redirect to="/" />;
    }
    return (
        <Fragment>
            <AuthNavBar />
            <JumbotronComponent />
        </Fragment>
    );
};

export default Home;
