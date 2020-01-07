import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";

export const OthersContext = createContext();

export const OthersProvider = props => {
    const [othersList, setOthersList] = useState([]);
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
            Axios.get("/api/others", config)
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

                .then(othersList => {
                    setOthersList(othersList);
                });
        }
        getList();
    }, []);
    return (
        <OthersContext.Provider
            value={[othersList, setOthersList, isLoading, setIsLoading]}
        >
            {props.children}
        </OthersContext.Provider>
    );
};
