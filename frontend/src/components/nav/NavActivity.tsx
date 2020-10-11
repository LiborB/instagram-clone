import {IconButton, Menu, MenuItem} from "@material-ui/core";
import {Favorite, FavoriteBorderOutlined} from "@material-ui/icons";
import React, {useState} from "react";
import {IconType} from "./NavIcon";

interface Props {
    className?: string;
}

function NavActivity(props: Props) {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>();

    const handleMenuItemClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <IconButton
                style={{marginRight: 10}}
                size="small"
                onClick={handleClick}
            >
                <FavoriteBorderOutlined
                    className={props.className}
                />
            </IconButton>
            <Menu
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
                <MenuItem onClick={handleMenuItemClose}>Settings</MenuItem>
            </Menu>
        </>
    );
}

export default NavActivity;
