import {UserDetails} from "../models/UserDetails";

export interface State {
    currentUser: UserDetails,
    isLoggedIn: boolean
}

export const SET_CURRENT_USER = "SET_CURRENT_USER";

interface SetCurrentUserAction {
    type: typeof SET_CURRENT_USER;
    payload: UserDetails
}

export type UserActionTypes = SetCurrentUserAction;
