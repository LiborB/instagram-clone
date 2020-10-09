import {UserDetails} from "../models/UserDetails";
import {SET_CURRENT_USER, UserActionTypes} from "./types";

export function SetCurrentUser(user: UserDetails): UserActionTypes {
    return {
        type: SET_CURRENT_USER,
        payload: user
    }
}
