import React, { useContext } from "react";
import {
    Card,
    CardDeck,
    CardLink,
    Spinner,
    UncontrolledTooltip
} from "reactstrap";
import { SocialContext } from "./SocialContext";
import Axios from "axios";

const SocialList = () => {
    const [socialList, setSocialList, isLoading] = useContext(SocialContext);
    return (
        <div className="container-fluid">
            <h2 className="heading">Social Lists</h2>
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
            ) : socialList.length ? (
                socialList.map(list => {
                    const { _id, link, linkName } = list;
                    return (
                        <CardDeck key={_id} className="socialListClass">
                            <Card
                                style={{
                                    backgroundColor: "#333",
                                    borderColor: "#333"
                                }}
                            >
                                <span className="socialListWord">
                                    {linkName.charAt(0).toUpperCase()}
                                </span>
                                <CardLink
                                    href={link}
                                    target="_blank"
                                    className="socialListLink"
                                    id="UncontrolledTooltipExample"
                                >
                                    {linkName.length > 11
                                        ? linkName.slice(0, 10) + " ..."
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
                                            `/api/social/${_id}`,
                                            config
                                        );
                                        //Get index
                                        let socialListCopy = socialList.map(
                                            list => list
                                        );
                                        for (
                                            let i = 0;
                                            i < socialListCopy.length;
                                            i++
                                        ) {
                                            let social = socialListCopy[i];
                                            if (social._id === _id) {
                                                socialListCopy.splice(i, 1);
                                                break;
                                            }
                                        }
                                        setSocialList(socialListCopy);
                                        alert(
                                            `Successfully removed ${linkName}`
                                        );
                                    }}
                                    alt="Delete"
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

export default SocialList;
