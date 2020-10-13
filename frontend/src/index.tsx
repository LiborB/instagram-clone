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
import moment from "moment"
import ReactMoment from "react-moment"
import 'react-perfect-scrollbar/dist/css/styles.css';
moment.defineLocale("en-short", {
    parentLocale: "en",
    relativeTime: {
        future: 'in %s',
        past: '%s',
        s:  'just now',
        ss: 'just now',
        m:  '1m',
        mm: '%dm',
        h:  '1h',
        hh: '%dh',
        d:  '1d',
        dd: '%dd',
        M:  '1 mnth',
        MM: '%d mnths',
        y:  '1y',
        yy: '%dy'
    }
})

moment.locale("en")

ReactMoment.globalMoment = moment;
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
