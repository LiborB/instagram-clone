import { IconButton, Menu, MenuItem } from "@material-ui/core";
import {
	AccountCircle,
	AccountCircleOutlined,
	Favorite,
	FavoriteBorderOutlined,
} from "@material-ui/icons";
import React, { useState } from "react";
import { IconType } from "./NavIcon";

interface Props {
	onIconClick: (type: IconType) => void;
	selected: boolean;
	className?: string;
}
function NavProfile(props: Props) {
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
		props.onIconClick("profile");
	};
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>();

	const handleMenuItemClose = () => {
		setAnchorEl(null);
	};
	const icon = () => {
		if (props.selected) {
			return (
				<AccountCircle
					className={`${props.className} nav-icon-filled`}
				></AccountCircle>
			);
		} else {
			return (
				<AccountCircleOutlined
					className={props.className}
				></AccountCircleOutlined>
			);
		}
	};
	return (
		<>
			<IconButton size="small" onClick={handleClick}>
				{icon()}
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

export default NavProfile;
