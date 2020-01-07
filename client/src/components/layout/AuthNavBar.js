import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from "reactstrap";
import "./AuthNavBar.css";
import DropDownMenu from "../auth/protectedRoutes/Home/DropDownMenu";

const AuthNavBar = () => {
    const navLinkIcon = {
        fontSize: "20px",
        paddingLeft: "10px"
    };
    const [collapsed, setIsCollapsed] = useState(true);
    const toggleNavbar = () => {
        setIsCollapsed(prevState => !prevState);
    };
    const authLinks = (
        <Fragment>
            <Navbar light expand="md" style={{ backgroundColor: "#0062cc" }}>
                <NavbarToggler
                    onClick={e => toggleNavbar(e)}
                    className="mr-2"
                />
                <NavbarBrand
                    className="mr-auto linkItem"
                    tag={Link}
                    to="/home"
                    style={navLinkIcon}
                >
                    Quick2Link
                </NavbarBrand>
                <Collapse isOpen={!collapsed} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem className="navItem">
                            <NavLink
                                style={navLinkIcon}
                                tag={Link}
                                to="/social"
                                className="linkItem"
                            >
                                Social
                            </NavLink>
                        </NavItem>
                        <NavItem className="navItem">
                            <NavLink
                                style={navLinkIcon}
                                tag={Link}
                                to="/movies"
                                className="linkItem"
                            >
                                Movies
                            </NavLink>
                        </NavItem>
                        <NavItem className="navItem">
                            <NavLink
                                tag={Link}
                                to="/sports"
                                style={navLinkIcon}
                                className="linkItem"
                            >
                                Sports
                            </NavLink>
                        </NavItem>
                        <NavItem className="navItem">
                            <NavLink
                                tag={Link}
                                to="/music"
                                style={navLinkIcon}
                                className="linkItem"
                            >
                                Music
                            </NavLink>
                        </NavItem>
                        <NavItem className="navItem">
                            <NavLink
                                tag={Link}
                                to="/others"
                                style={navLinkIcon}
                                className="linkItem"
                            >
                                Others
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
                <Nav>
                    <NavItem className="navItem">
                        <DropDownMenu />
                    </NavItem>
                </Nav>
            </Navbar>
        </Fragment>
    );
    return <Fragment>{authLinks}</Fragment>;
};

export default AuthNavBar;
