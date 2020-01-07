import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import AuthNavBar from "../../../layout/AuthNavBar";
import "./index.css";
import MoviesForm from "./MoviesForm";
import MoviesList from "./MoviesList";

const Movies = props => {
    if (props.isAuth === false) {
        return <Redirect to="/forbidden" />;
    }
    return (
        <Fragment>
            <AuthNavBar />
            <MoviesForm />
            <MoviesList />
        </Fragment>
    );
};

export default Movies;
