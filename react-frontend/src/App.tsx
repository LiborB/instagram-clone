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
import {Route, BrowserRouter, Switch, useHistory} from "react-router-dom";
import HomePage from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NavIcon, {IconType} from "./components/nav/NavIcon";
import DirectPage from "./components/direct/DirectPage";
import Axios from "axios";
import {UserDetails} from "./models/UserDetails";
import {useDispatch} from "react-redux";
import {SetCurrentUser} from "./store/actions";

function App() {
    const [currentLink, setCurrentLink] = useState("");
    const router = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            Axios.get<UserDetails>("user/auth", {
                params: {
                    token
                }
            }).then(response => {
                dispatch(SetCurrentUser(response.data));
            })
        }
    }, [dispatch])

    function iconClick(type: IconType) {
        setCurrentLink(type);
    }

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
                        <div style={{width: "40%"}}>
                            <SearchBar/>
                        </div>
                        <div>
                            <NavIcon
                                type="home"
                                selected={currentLink === "home"}
                                onIconClick={iconClick}
                            />
                            <NavIcon
                                selected={currentLink === "direct"}
                                type="direct"
                                onIconClick={iconClick}
                            />
                            <NavIcon
                                selected={currentLink === "activity"}
                                type="activity"
                                onIconClick={iconClick}/>

                            <NavIcon
                                selected={currentLink === "profile"}
                                type="profile"
                                onIconClick={iconClick}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
            <div style={{textAlign: "center", paddingTop: 20}}>
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
