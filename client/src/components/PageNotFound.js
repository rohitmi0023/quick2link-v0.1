import React, { Fragment } from "react";

const PageNotFound = props => {
    if (true) {
        setTimeout(() => {
            props.history.push("/");
        }, 2000);
    }
    return (
        <Fragment>
            <h1
                style={{
                    margin: "20px auto",
                    display: "block",
                    textAlign: "center"
                }}
            >
                Page Not Found!
            </h1>
            <br></br>
            <h2
                style={{
                    margin: "20px auto",
                    display: "block",
                    textAlign: "center"
                }}
            >
                Redirecting you in 2s!
            </h2>
        </Fragment>
    );
};

export default PageNotFound;
