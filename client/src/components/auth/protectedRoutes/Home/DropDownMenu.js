import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import { UserProfileContext } from "./UserProfileContext";
import "./dropdownMenuCss.css";

const DropDownMenu = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userInfo] = useContext(UserProfileContext);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    return (
        <Fragment>
            {userInfo.map(list => {
                const { _id, name, avatar } = list;
                return (
                    <Dropdown
                        isOpen={dropdownOpen}
                        toggle={toggle}
                        key={_id}
                        style={{ float: "right" }}
                    >
                        <DropdownToggle
                            caret
                            style={{
                                maxWidth: "67px",
                                backgroundColor: "#0062cc",
                                border: "none"
                            }}
                        >
                            <img
                                src={avatar}
                                alt={name}
                                style={{
                                    maxHeight: "40px",
                                    borderRadius: "50%"
                                }}
                            />
                        </DropdownToggle>
                        <DropdownMenu right className="dropdownMenus">
                            <DropdownItem header>
                                Signed in as <br />{" "}
                                <b>
                                    {name.length > 13
                                        ? name.slice(0, 12) + "..."
                                        : name}
                                </b>
                            </DropdownItem>
                            <DropdownItem
                                className="dropDownItemCss"
                                tag={Link}
                                to="/profile"
                            >
                                Your profile
                            </DropdownItem>
                            <DropdownItem
                                className="dropDownItemCss"
                                tag={Link}
                                to="/stats"
                            >
                                Your stats
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem className="dropDownItemCss" href="/">
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                );
            })}
        </Fragment>
    );
};

export default DropDownMenu;
