import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";

export const SocialContext = createContext();

export const SocialProvider = props => {
    const [socialList, setSocialList] = useState([]);
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
            Axios.get("/api/social", config)
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

                .then(socialList => {
                    setSocialList(socialList);
                });
        }
        getList();
    }, []);
    return (
        <SocialContext.Provider
            value={[socialList, setSocialList, isLoading, setIsLoading]}
        >
            {props.children}
        </SocialContext.Provider>
    );
};
// const token = localStorage.getItem("token");
// const config = {
//     headers: {
//         "Content-Type": "application/json",
//         "x-auth-token": `${token}`
//     }
// };
// Axios.get("/api/social", config)
//     .then(res => {
//         if (Boolean(res)) {
//             setIsLoading(false);
//         }
//         return res.data[0].lists.map(list => ({
//             _id: `${list._id}`,
//             link: `${list.link}`,
//             linkName: `${list.linkName}`
//         }));
//     })
//     .then(socialList => {
//         setSocialList(socialList);
//     });
// return socialList;
// useEffect(() => {
//     effect;
//     return () => {
//         cleanup;
//     };
// }, [input]);
