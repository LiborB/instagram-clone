import {State, UserActionTypes} from "./types";
import {UserDetails} from "../models/UserDetails";
import Axios from "axios";

const initialState: State = {
    currentUser: new UserDetails(),
    isLoggedIn: false
}

export function userReducer(state = initialState, action: UserActionTypes): State {
    switch (action.type) {
        case "SET_CURRENT_USER":
            if (action.payload.token) {
                localStorage.setItem("token", action.payload.token);
                Axios.defaults.headers.common = {
                    "token": action.payload.token
                }
            }
            else {
                localStorage.removeItem("token")
                Axios.defaults.headers.common = {}
            }
            return {
                ...state,
                currentUser: action.payload,
                isLoggedIn: action.payload.token.length > 0
            }
        default:
            return state;
    }
}
