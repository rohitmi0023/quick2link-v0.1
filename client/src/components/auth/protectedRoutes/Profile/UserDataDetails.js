import React, { useContext, Fragment } from "react";
import { UserProfileContext } from "../Home/UserProfileContext";
import "./userProfileData.css";

const UserDataDetails = () => {
    const [userInfo] = useContext(UserProfileContext);
    return (
        <Fragment>
            {userInfo.map(list => {
                const { _id, name, avatar, email } = list;
                return (
                    <div className="userDetails" key={_id}>
                        <h3 style={{ marginLeft: "5px", textAlign: "center" }}>
                            User Details :
                        </h3>
                        <span className="field">Name : </span>
                        <span className="data">{name}</span>
                        <br />
                        <br />
                        <span className="field">Email : </span>
                        <span className="data">{email}</span>
                        <br />
                        <br />
                        <span
                            className="field"
                            style={{ position: "relative" }}
                        >
                            Profile Picture :
                        </span>
                        <span className="data">
                            <img
                                src={avatar}
                                alt=""
                                style={{
                                    maxWidth: "100px",
                                    maxHeight: "100px",
                                    borderRadius: "20%",
                                    marginLeft: "20px",
                                    position: "absolute"
                                }}
                            />
                        </span>
                    </div>
                );
            })}
        </Fragment>
    );
};

export default UserDataDetails;
