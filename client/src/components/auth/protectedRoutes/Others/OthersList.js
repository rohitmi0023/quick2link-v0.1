import React, { useContext } from "react";
import {
    Card,
    CardDeck,
    CardLink,
    Spinner,
    UncontrolledTooltip
} from "reactstrap";
import { OthersContext } from "./OthersContext";
import Axios from "axios";

const OthersList = () => {
    const [othersList, setOthersList, isLoading] = useContext(OthersContext);
    return (
        <div className="container-fluid">
            <h2 className="heading">Others Lists</h2>
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
            ) : othersList.length ? (
                othersList.map(list => {
                    const { _id, link, linkName } = list;
                    return (
                        <CardDeck key={_id} className="othersListClass">
                            <Card
                                href={link}
                                style={{
                                    backgroundColor: "#333",
                                    borderColor: "#333"
                                }}
                            >
                                <span className="othersListWord">
                                    {linkName.charAt(0).toUpperCase()}
                                </span>
                                <CardLink
                                    href={link}
                                    target="_blank"
                                    className="othersListLink"
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
                                            `/api/others/${_id}`,
                                            config
                                        );
                                        //Get index
                                        let othersListCopy = othersList.map(
                                            list => list
                                        );
                                        for (
                                            let i = 0;
                                            i < othersListCopy.length;
                                            i++
                                        ) {
                                            let others = othersListCopy[i];
                                            if (others._id === _id) {
                                                othersListCopy.splice(i, 1);
                                                break;
                                            }
                                        }
                                        setOthersList(othersListCopy);
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

export default OthersList;
