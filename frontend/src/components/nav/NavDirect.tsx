import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { Home, HomeOutlined, Send, SendOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import {useHistory, useLocation} from "react-router-dom";
import { IconType } from "./NavIcon";
import {DirectMessageIcon} from "../shared/Icons";

interface Props {
	className?: string;
}
function NavDirect(props: Props) {
	const router = useHistory();
	const location = useLocation();
	const handleClick = () => {
		router.push("/direct");
	};
	const icon = () => {
		if (location.pathname === "/direct") {
			return (
				<DirectMessageIcon filled={true}/>
			);
		} else {
			return <DirectMessageIcon filled={false}/>;
		}
	};
	return (
		<>
			<IconButton
				disableRipple
				style={{ marginRight: 10, backgroundColor: "transparent" }}
				size="small"
				onClick={handleClick}
			>
				{icon()}
			</IconButton>
		</>
	);
}

export default NavDirect;
