import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";

export const MoviesContext = createContext();

export const MoviesProvider = props => {
    const [moviesList, setMoviesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        function getList() {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": `${token}`
                }
            };
            Axios.get("/api/movies", config)
                .then(res => {
                    if (Boolean(res)) {
                        setIsLoading(false);
                    }
                    if (res.data.length) {
                        return res.data[0].lists.map(list => ({
                            _id: `${list._id}`,
                            link: `${list.link}`,
                            linkName: `${list.linkName}`
                        }));
                    } else {
                        return [];
                    }
                })
                .then(moviesList => {
                    setMoviesList(moviesList);
                });
        }
        getList();
    }, []);
    return (
        <MoviesContext.Provider
            value={[moviesList, setMoviesList, isLoading, setIsLoading]}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};
