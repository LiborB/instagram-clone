import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { Home, HomeOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { IconType } from "./NavIcon";

interface Props {
	onIconClick: (type: IconType) => void;
	selected: boolean;
	className?: string;
}
function NavHome(props: Props) {
	const router = useHistory();

	const handleClick = () => {
		router.push("/home");
		props.onIconClick("home");
	};
	const icon = () => {
		if (props.selected) {
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
