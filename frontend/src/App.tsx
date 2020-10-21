import React, {useEffect, useState} from "react";
import "./App.scss";
import {
    AppBar, Box,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@material-ui/core";
import SearchBar from "./components/nav/SearchBar";
import {Route, BrowserRouter, Switch, useHistory, useLocation} from "react-router-dom";
import HomePage from "./components/home/HomePage";
import LoginPage from "./components/user/LoginPage";
import SignupPage from "./components/user/SignupPage";
import NavIcon, {IconType} from "./components/nav/NavIcon";
import DirectPage from "./components/direct/DirectPage";
import Axios from "axios";
import {UserDetails} from "./models/UserDetails";
import {useDispatch, useSelector} from "react-redux";
import {SetCurrentUser} from "./store/actions";
import {UploadPost} from "./components/nav/UploadPost";
import {RootState, UserState} from "./store/types";
import {UserPage} from "./components/user/UserPage";
import PerfectScrollBar from "react-perfect-scrollbar"
import styled from "styled-components";

const NavBar = styled(AppBar)`
background-color: white;
`

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
        <Box display="flex" flexDirection="column" height="100%">
            <Box>
                <NavBar position="static" variant="outlined">
                    <Toolbar className="nav-toolbar">
                        <Typography
                            color="textPrimary"
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
                </NavBar>
            </Box>
            <Box flexGrow="1" style={{paddingTop: 20, backgroundColor: "#FAFAFA"}}>
                <Switch>
                    <Route path="/home">
                        <HomePage></HomePage>
                    </Route>
                    <Route path="/login">
                        <LoginPage></LoginPage>
                    </Route>
                    <Route path="/signup">
                        <SignupPage></SignupPage>
                    </Route>
                    <Route path="/direct">
                        <DirectPage></DirectPage>
                    </Route>
                    <Route path="/user/:username"
                           render={(props) => <UserPage username={props.match.params.username}/>}>
                    </Route>
                    <Route path="/">
                        <LoginPage></LoginPage>
                    </Route>
                </Switch>
            </Box>
        </Box>
    );
}

export default App;
