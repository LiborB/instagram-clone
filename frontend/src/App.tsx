import React, {useEffect, useState} from "react";
import "./App.scss";
import {
    AppBar,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@material-ui/core";
import SearchBar from "./components/nav/SearchBar";
import {Route, BrowserRouter, Switch, useHistory, useLocation} from "react-router-dom";
import HomePage from "./components/home/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NavIcon, {IconType} from "./components/nav/NavIcon";
import DirectPage from "./components/direct/DirectPage";
import Axios from "axios";
import {UserDetails} from "./models/UserDetails";
import {useDispatch, useSelector} from "react-redux";
import {SetCurrentUser} from "./store/actions";
import {UploadPost} from "./components/nav/UploadPost";
import {RootState, UserState} from "./store/types";

function App() {
    const router = useHistory();
    const dispatch = useDispatch();
    const {isLoggedIn} = useSelector((state: RootState) => state.userState);
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            Axios.get<UserDetails>("user/auth", {
                params: {
                    token
                }
            }).then(response => {
                dispatch(SetCurrentUser(response.data));
                if (router.location.pathname === "/" || router.location.pathname === "/login" || router.location.pathname === "/signup") {
                    router.push("/home")
                }
            })
        }
    }, [dispatch, router])

    return (
        <div>
            <div>
                <AppBar position="static" color="default">
                    <Toolbar className="nav-toolbar">
                        <Typography
                            className="logo"
                            onClick={() => router.push("/home")}
                            variant="h6"
                        >
                            Instagram
                        </Typography>
                        <div style={{width: "40%", display: "flex", alignItems: "center"}}>
                            <SearchBar/>
                            {isLoggedIn && <UploadPost/>}

                        </div>
                        <div>
                            <NavIcon
                                type="home"
                            />
                            <NavIcon
                                type="direct"
                            />
                            <NavIcon type="activity"/>
                            <NavIcon
                                type="profile"
                            />
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
            <div style={{paddingTop: 20}}>
                <Switch>
                    <Route path="/home">
                        <HomePage></HomePage>
                    </Route>
                    <Route path="/login">
                        <Login></Login>
                    </Route>
                    <Route path="/signup">
                        <Signup></Signup>
                    </Route>
                    <Route path="/direct">
                        <DirectPage></DirectPage>
                    </Route>
                    <Route path="/">
                        <Login></Login>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default App;
