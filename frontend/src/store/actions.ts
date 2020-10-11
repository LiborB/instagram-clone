import {UserDetails} from "../models/UserDetails";
import {PostActionTypes, SET_CURRENT_USER, SET_POST_UPDATED, UserActionTypes} from "./types";

export function SetCurrentUser(user: UserDetails): UserActionTypes {
    return {
        type: SET_CURRENT_USER,
        payload: user
    }
}

export function SetPostUpdated(updated: boolean): PostActionTypes {
    return {
        type: SET_POST_UPDATED,
        payload: updated
    }
}
