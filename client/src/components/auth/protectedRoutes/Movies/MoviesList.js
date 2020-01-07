import React, { useContext } from "react";
import {
    Card,
    CardDeck,
    CardLink,
    Spinner,
    UncontrolledTooltip
} from "reactstrap";
import { MoviesContext } from "./MoviesContext";
import Axios from "axios";

const MoviesList = () => {
    const [moviesList, setMoviesList, isLoading] = useContext(MoviesContext);
    return (
        <div className="container-fluid">
            <h2 className="heading">Movies Lists</h2>
            {isLoading ? (
                <Spinner
                    color="primary"
                    style={{
                        width: "4rem",
                        height: "4rem",
                        display: "block",
                        margin: "0 auto"
                    }}
                />
            ) : moviesList.length ? (
                moviesList.map(list => {
                    const { _id, link, linkName } = list;
                    return (
                        <CardDeck key={_id} className="moviesListClass">
                            <Card
                                href={link}
                                style={{
                                    backgroundColor: "#333",
                                    borderColor: "#333"
                                }}
                            >
                                <span className="moviesListWord">
                                    {linkName.charAt(0).toUpperCase()}
                                </span>
                                <CardLink
                                    href={link}
                                    target="_blank"
                                    className="moviesListLink"
                                    id="UncontrolledTooltipExample"
                                >
                                    {linkName.length > 10
                                        ? linkName.slice(0, 8) + "..."
                                        : linkName}
                                </CardLink>
                                <UncontrolledTooltip
                                    placement="top"
                                    target="UncontrolledTooltipExample"
                                >
                                    {linkName}
                                </UncontrolledTooltip>
                                <img
                                    src={require("../deleteImage.png")}
                                    style={{
                                        maxWidth: "21px",
                                        maxHeight: "21px",
                                        position: "absolute"
                                    }}
                                    onClick={async () => {
                                        const token = localStorage.getItem(
                                            "token"
                                        );
                                        const config = {
                                            headers: {
                                                "Content-Type":
                                                    "application/json",
                                                "x-auth-token": `${token}`
                                            }
                                        };
                                        await Axios.delete(
                                            `/api/movies/${_id}`,
                                            config
                                        );
                                        //Get index
                                        let moviesListCopy = moviesList.map(
                                            list => list
                                        );
                                        for (
                                            let i = 0;
                                            i < moviesListCopy.length;
                                            i++
                                        ) {
                                            let movies = moviesListCopy[i];
                                            if (movies._id === _id) {
                                                moviesListCopy.splice(i, 1);
                                                break;
                                            }
                                        }
                                        setMoviesList(moviesListCopy);
                                        alert(
                                            `Successfully removed ${linkName}`
                                        );
                                    }}
                                    alt=""
                                />
                            </Card>
                        </CardDeck>
                    );
                })
            ) : (
                <p
                    style={{
                        paddingTop: "30px",
                        textAlign: "center",
                        fontSize: "25px"
                    }}
                >
                    Nothing Added...
                </p>
            )}
        </div>
    );
};

export default MoviesList;
