import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";

export const SportsContext = createContext();

export const SportsProvider = props => {
    const [sportsList, setSportsList] = useState([]);
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
            Axios.get("/api/sports", config)
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

                .then(sportsList => {
                    setSportsList(sportsList);
                });
        }
        getList();
    }, []);
    return (
        <SportsContext.Provider
            value={[sportsList, setSportsList, isLoading, setIsLoading]}
        >
            {props.children}
        </SportsContext.Provider>
    );
};
