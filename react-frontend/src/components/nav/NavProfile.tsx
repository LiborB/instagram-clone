import {IconButton, Menu, MenuItem, MenuItemProps} from "@material-ui/core";
import {
    AccountCircle,
    AccountCircleOutlined,
    Favorite,
    FavoriteBorderOutlined,
} from "@material-ui/icons";
import React, {useState} from "react";
import {IconType} from "./NavIcon";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../store/types";
import { useHistory } from "react-router-dom";
import {SetCurrentUser} from "../../store/actions";
import {UserDetails} from "../../models/UserDetails";

interface Props {
    onIconClick: (type: IconType) => void;
    selected: boolean;
    className?: string;
}

function NavProfile(props: Props) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>();
    const {isLoggedIn} = useSelector((state: State) => state);
    const history = useHistory();
    const dispatch = useDispatch();

    function handleMenuItemClose() {
        setAnchorEl(null);
    }

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        props.onIconClick("profile");
        setAnchorEl(event.currentTarget);
    }

    function loginClick() {
        history.push("/login")
        handleMenuItemClose();
    }

    function logoutClick() {
        history.push("/login");
        dispatch(SetCurrentUser(new UserDetails()))
        handleMenuItemClose();
    }

    function Icon() {
        if (props.selected) {
            return (
                <AccountCircle
                    className={`${props.className} nav-icon-filled`}
                />
            );
        } else {
            return (
                <AccountCircleOutlined
                    className={props.className}
                />
            );
        }
    }


    function MenuItems() {
        if (isLoggedIn) {
            return <><MenuItem onClick={handleMenuItemClose}>Profile</MenuItem>
                <MenuItem onClick={logoutClick}>Sign Out</MenuItem></>
        } else {
            return <MenuItem onClick={loginClick}>Log In</MenuItem>
        }
    }

    return (
        <>
            <IconButton size="small" onClick={handleClick}>
                <Icon></Icon>
            </IconButton>
            <Menu
                keepMounted
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                getContentAnchorEl={null}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuItemClose}
            >
                <MenuItems></MenuItems>
            </Menu>
        </>
    );
}

export default NavProfile;
