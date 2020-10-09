import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { Favorite, FavoriteBorderOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import { IconType } from "./NavIcon";

interface Props {
	onIconClick: (type: IconType) => void;
	selected: boolean;
	className?: string;
}
function NavActivity(props: Props) {
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
		props.onIconClick("activity");
	};
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>();

	const handleMenuItemClose = () => {
		setAnchorEl(null);
	};
	const icon = () => {
		if (props.selected) {
			return (
				<Favorite
					className={`${props.className} nav-icon-filled`}
				></Favorite>
			);
		} else {
			return (
				<FavoriteBorderOutlined
					className={props.className}
				></FavoriteBorderOutlined>
			);
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
