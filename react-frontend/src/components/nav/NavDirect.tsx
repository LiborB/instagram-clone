import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { Home, HomeOutlined, Send, SendOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { IconType } from "./NavIcon";

interface Props {
	onIconClick: (type: IconType) => void;
	selected: boolean;
	className?: string;
}
function NavDirect(props: Props) {
	const router = useHistory();
	const handleClick = () => {
		router.push("/direct");
		props.onIconClick("direct");
	};
	const icon = () => {
		if (props.selected) {
			return (
				<Send className={`${props.className} nav-icon-filled`}></Send>
			);
		} else {
			return <SendOutlined className={props.className}></SendOutlined>;
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

export default NavDirect;
