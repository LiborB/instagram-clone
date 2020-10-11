import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {BrowserRouter} from "react-router-dom";
import Axios from "axios";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux"
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import reducers from "./store/reducers";

Axios.defaults.baseURL = "https://localhost:44317/api/";
const token = localStorage.getItem("token")
if (token) {
    Axios.defaults.headers.common = {
        "token": token
    }
}
const store = createStore(reducers)
const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#0095f6",
        }
    }
});
ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();