import React, { useContext } from "react";
import {
    Card,
    CardDeck,
    CardLink,
    Spinner,
    UncontrolledTooltip
} from "reactstrap";
import { MusicContext } from "./MusicContext";
import Axios from "axios";

const MusicList = () => {
    const [musicList, setMusicList, isLoading] = useContext(MusicContext);
    return (
        <div className="container-fluid">
            <h2 className="heading">Music Lists</h2>
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
            ) : musicList.length ? (
                musicList.map(list => {
                    const { _id, link, linkName } = list;
                    return (
                        <CardDeck key={_id} className="musicListClass">
                            <Card
                                href={link}
                                style={{
                                    backgroundColor: "#333",
                                    borderColor: "#333"
                                }}
                            >
                                <span className="musicListWord">
                                    {linkName.charAt(0).toUpperCase()}
                                </span>
                                <CardLink
                                    href={link}
                                    target="_blank"
                                    className="musicListLink"
                                    id="UncontrolledTooltipExample"
                                >
                                    {linkName.length > 10
                                        ? linkName.slice(0, 8) + "..."
                                        : linkName}
                                </CardLink>{" "}
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
                                            `/api/music/${_id}`,
                                            config
                                        );
                                        //Get index
                                        let musicListCopy = musicList.map(
                                            list => list
                                        );
                                        for (
                                            let i = 0;
                                            i < musicListCopy.length;
                                            i++
                                        ) {
                                            let music = musicListCopy[i];
                                            if (music._id === _id) {
                                                musicListCopy.splice(i, 1);
                                                break;
                                            }
                                        }
                                        setMusicList(musicListCopy);
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

export default MusicList;
