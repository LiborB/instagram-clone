import {IconButton, Menu, MenuItem} from "@material-ui/core";
import {Home, HomeOutlined} from "@material-ui/icons";
import React, {useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import {IconType} from "./NavIcon";
import {HomeIcon} from "../shared/Icons";

interface Props {
    className?: string;
}

function NavHome(props: Props) {
    const router = useHistory();
    const location = useLocation();

    const handleClick = () => {
        router.push("/home");
    };
    const icon = () => {
        if (location.pathname === "/home") {
            return (
                <HomeIcon filled={true}/>
            );
        } else {
            return <HomeIcon filled={false}/>;
        }
    };
    return (
        <>
            <IconButton
                style={{marginRight: 10, backgroundColor: "transparent"}}
                size="small"
                onClick={handleClick}
            >
                {icon()}
            </IconButton>
        </>
    );
}

export default NavHome;
