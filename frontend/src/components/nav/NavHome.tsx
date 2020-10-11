import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { Home, HomeOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { IconType } from "./NavIcon";

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
				<Home className={`${props.className} nav-icon-filled`}></Home>
			);
		} else {
			return <HomeOutlined className={props.className}></HomeOutlined>;
		}
	};
	return (
		<>
			<IconButton
				style={{ marginRight: 10 }}
				size="small"
				onClick={handleClick}
			>
				{icon()}
			</IconButton>
		</>
	);
}

export default NavHome;
