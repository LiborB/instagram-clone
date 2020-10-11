import {UserDetails} from "../models/UserDetails";

export interface UserState {
    currentUser: UserDetails,
    isLoggedIn: boolean
}

export interface PostState {
    postUpdated: {
        updated: boolean
    }
}

export type RootState = {
    userState: UserState,
    postState: PostState
}

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SET_POST_UPDATED = "SET_POST_UPDATED";

interface SetPostUpdatedAction {
    type: typeof SET_POST_UPDATED;
    payload: boolean
}

interface SetCurrentUserAction {
    type: typeof SET_CURRENT_USER;
    payload: UserDetails
}

export type UserActionTypes = SetCurrentUserAction;

export type PostActionTypes = SetPostUpdatedAction;
