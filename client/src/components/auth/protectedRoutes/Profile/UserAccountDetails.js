import React, { useContext, Fragment } from "react";
import { UserProfileContext } from "../Home/UserProfileContext";
import "./userProfileData.css";

const UserAccountDetails = () => {
    const [userInfo] = useContext(UserProfileContext);
    return (
        <Fragment>
            {userInfo.map(list => {
                const { _id, date } = list;
                const dateString = date.toString();
                const dateDate = dateString.slice(0, 10);
                const dateTime = dateString.slice(11, 16);
                return (
                    <div className="userAccountDetails" key={_id}>
                        <h3 style={{ marginLeft: "5px", textAlign: "center" }}>
                            Account Details :
                        </h3>
                        <span className="field">Created On : </span>
                        <span className="data">{dateDate}</span>
                        <br />
                        <br />
                        <span className="field">Created At : </span>
                        <span className="data">{dateTime + " (GMT Zone)"}</span>
                        <br />
                    </div>
                );
            })}
        </Fragment>
    );
};

export default UserAccountDetails;
