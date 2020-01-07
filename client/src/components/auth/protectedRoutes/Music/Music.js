import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import AuthNavBar from "../../../layout/AuthNavBar";
import "./index.css";
import MusicForm from "./MusicForm";
import MusicList from "./MusicList";

const Music = props => {
    if (props.isAuth === false) {
        return <Redirect to="/forbidden" />;
    }
    return (
        <Fragment>
            <AuthNavBar />
            <MusicForm />
            <MusicList />
        </Fragment>
    );
};

export default Music;
