import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";

export const MusicContext = createContext();

export const MusicProvider = props => {
    const [musicList, setMusicList] = useState([]);
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
            Axios.get("/api/music", config)
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

                .then(musicList => {
                    setMusicList(musicList);
                });
        }
        getList();
    }, []);
    return (
        <MusicContext.Provider
            value={[musicList, setMusicList, isLoading, setIsLoading]}
        >
            {props.children}
        </MusicContext.Provider>
    );
};
