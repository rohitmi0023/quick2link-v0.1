import React, { useContext } from "react";
import {
    Card,
    CardDeck,
    CardLink,
    Spinner,
    UncontrolledTooltip
} from "reactstrap";
import { SportsContext } from "./SportsContext";
import Axios from "axios";

const SportsList = () => {
    const [sportsList, setSportsList, isLoading] = useContext(SportsContext);
    return (
        <div className="container-fluid">
            <h2 className="heading">Sports Lists</h2>
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
            ) : sportsList.length ? (
                sportsList.map(list => {
                    const { _id, link, linkName } = list;
                    return (
                        <CardDeck key={_id} className="sportsListClass">
                            <Card
                                href={link}
                                style={{
                                    backgroundColor: "#333",
                                    borderColor: "#333"
                                }}
                            >
                                <span className="sportsListWord">
                                    {linkName.charAt(0).toUpperCase()}
                                </span>
                                <CardLink
                                    href={link}
                                    target="_blank"
                                    className="sportsListLink"
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
                                            `/api/sports/${_id}`,
                                            config
                                        );
                                        //Get index
                                        let sportsListCopy = sportsList.map(
                                            list => list
                                        );
                                        for (
                                            let i = 0;
                                            i < sportsListCopy.length;
                                            i++
                                        ) {
                                            let sports = sportsListCopy[i];
                                            if (sports._id === _id) {
                                                sportsListCopy.splice(i, 1);
                                                break;
                                            }
                                        }
                                        setSportsList(sportsListCopy);
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

export default SportsList;
