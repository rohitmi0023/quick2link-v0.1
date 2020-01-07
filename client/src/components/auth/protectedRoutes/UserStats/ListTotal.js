import React, { useContext, useEffect } from "react";
import { Card, CardDeck, CardSubtitle } from "reactstrap";
import { UserProfileContext } from "../Home/UserProfileContext";
import UserProfile from "../Profile/UserProfile";

const ListTotal = () => {
    const [userInfo] = useContext(UserProfileContext);
    return (
        <div>
            {userInfo.map(list => {
                const {
                    _id,
                    socialList,
                    moviesList,
                    sportsList,
                    musicList
                } = list;
                return (
                    <div key={_id}>
                        <br />
                        <h3
                            style={{
                                textAlign: "center",
                                borderBottom: "2px solid darkgrey",
                                paddingBottom: "10px"
                            }}
                        >
                            Facts regarding your links usage:
                        </h3>
                        <br />
                        <p style={{ fontSize: "20px", paddingLeft: "20px" }}>
                            Total no. of links saved : (before current log in)
                        </p>
                        <CardDeck className="dataInfoListClass">
                            <Card
                                style={{
                                    backgroundColor: "#333",
                                    borderColor: "#333"
                                }}
                            >
                                <CardSubtitle
                                    style={{
                                        fontSize: "70px",
                                        fontFamily: "Archivo Black",
                                        minWidth: "100px"
                                    }}
                                >
                                    {socialList.length}
                                </CardSubtitle>
                                Social
                            </Card>
                        </CardDeck>
                        <CardDeck className="dataInfoListClass">
                            <Card
                                style={{
                                    backgroundColor: "#333",
                                    borderColor: "#333"
                                }}
                            >
                                <CardSubtitle
                                    style={{
                                        fontSize: "70px",
                                        fontFamily: "Archivo Black",
                                        minWidth: "100px"
                                    }}
                                >
                                    {moviesList.length}
                                </CardSubtitle>
                                Movies
                            </Card>
                        </CardDeck>
                        <CardDeck className="dataInfoListClass">
                            <Card
                                style={{
                                    backgroundColor: "#333",
                                    borderColor: "#333"
                                }}
                            >
                                <CardSubtitle
                                    style={{
                                        fontSize: "70px",
                                        fontFamily: "Archivo Black",
                                        minWidth: "100px"
                                    }}
                                >
                                    {sportsList.length
                                        ? sportsList.length
                                        : `0`}
                                </CardSubtitle>
                                Sports
                            </Card>
                        </CardDeck>
                        <CardDeck className="dataInfoListClass">
                            <Card
                                style={{
                                    backgroundColor: "#333",
                                    borderColor: "#333"
                                }}
                            >
                                <CardSubtitle
                                    style={{
                                        fontSize: "70px",
                                        fontFamily: "Archivo Black",
                                        minWidth: "100px"
                                    }}
                                >
                                    {musicList.length}
                                </CardSubtitle>
                                Music
                            </Card>
                        </CardDeck>
                    </div>
                );
            })}
        </div>
    );
};

export default ListTotal;
