import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Landing from "./components/styles/Landing/Landing";
import Home from "./components/auth/protectedRoutes/Home/Home";
import Forbidden from "./components/layout/Forbidden";
import Social from "./components/auth/protectedRoutes/Social/Social";
import Sports from "./components/auth/protectedRoutes/Sports/Sports";
import Music from "./components/auth/protectedRoutes/Music/Music";
import Movies from "./components/auth/protectedRoutes/Movies/Movies";
import Logout from "./components/auth/Logout";
import "./App.css";
import { UserProfileProvider } from "./components/auth/protectedRoutes/Home/UserProfileContext";
import { SocialProvider } from "./components/auth/protectedRoutes/Social/SocialContext";
import { SportsProvider } from "./components/auth/protectedRoutes/Sports/SportsContext";
import { MoviesProvider } from "./components/auth/protectedRoutes/Movies/MoviesContext";
import { MusicProvider } from "./components/auth/protectedRoutes/Music/MusicContext";
import PageNotFound from "./components/PageNotFound";
import UserProfile from "./components/auth/protectedRoutes/Profile/UserProfile";
import UserStats from "./components/auth/protectedRoutes/UserStats/UserStats";
import Others from "./components/auth/protectedRoutes/Others/Others";
import { OthersProvider } from "./components/auth/protectedRoutes/Others/OthersContext";

const App = () => {
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            setIsAuth(true);
        }
    }, [isAuth]);

    return (
        <Fragment>
            <Router>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route
                        exact
                        path="/register"
                        render={props => (
                            <Register {...props} isAuth={isAuth} />
                        )}
                    />
                    <Route
                        exact
                        path="/login"
                        render={props => <Login {...props} isAuth={isAuth} />}
                    />

                    <UserProfileProvider>
                        <Route
                            exact
                            path="/home"
                            render={props => (
                                <Home {...props} isAuth={isAuth} />
                            )}
                        />
                        <SocialProvider>
                            <Route
                                exact
                                path="/social"
                                render={props => (
                                    <Social {...props} isAuth={isAuth} />
                                )}
                            />
                        </SocialProvider>
                        <SportsProvider>
                            <Route
                                exact
                                path="/sports"
                                render={props => (
                                    <Sports {...props} isAuth={isAuth} />
                                )}
                            />
                        </SportsProvider>
                        <MusicProvider>
                            <Route
                                exact
                                path="/music"
                                render={props => (
                                    <Music {...props} isAuth={isAuth} />
                                )}
                            />
                        </MusicProvider>
                        <MoviesProvider>
                            {" "}
                            <Route
                                exact
                                path="/movies"
                                render={props => (
                                    <Movies {...props} isAuth={isAuth} />
                                )}
                            />
                        </MoviesProvider>
                        <OthersProvider>
                            <Route
                                exact
                                path="/others"
                                render={props => (
                                    <Others {...props} isAuth={isAuth} />
                                )}
                            />
                        </OthersProvider>
                        <Route
                            exact
                            path="/logout"
                            render={props => (
                                <Logout {...props} isAuth={isAuth} />
                            )}
                        />
                        <Route
                            exact
                            path="/profile"
                            render={props => (
                                <UserProfile {...props} isAuth={isAuth} />
                            )}
                        />
                        <Route
                            exact
                            path="/stats"
                            render={props => (
                                <UserStats {...props} isAuth={isAuth} />
                            )}
                        />
                    </UserProfileProvider>
                    <Route exact path="/forbidden" component={Forbidden} />
                    <Route
                        path="/*"
                        render={props => (
                            <PageNotFound {...props} isAuth={isAuth} />
                        )}
                    />
                </Switch>
            </Router>
        </Fragment>
    );
};

export default App;
