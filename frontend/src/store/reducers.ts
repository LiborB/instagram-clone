import {PostActionTypes, PostState, UserActionTypes, UserState} from "./types";
import {UserDetails} from "../models/UserDetails";
import Axios from "axios";
import {combineReducers} from "redux";

const initialUserState: UserState = {
    currentUser: new UserDetails(),
    isLoggedIn: false
}

function userReducer(state = initialUserState, action: UserActionTypes): UserState {
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

const initialPostState: PostState = {
    postUpdated: {
        updated: false
    }
}

function postReducer(state = initialPostState, action: PostActionTypes): PostState {
    switch (action.type) {
        case "SET_POST_UPDATED":
            return {
                ...state,
                postUpdated: {
                    updated: action.payload
                }
            }
        default:
            return state;
    }
}

const combinedReducer = combineReducers({userState: userReducer, postState: postReducer})

export default combinedReducer;
