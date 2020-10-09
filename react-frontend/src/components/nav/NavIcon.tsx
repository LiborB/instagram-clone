import React from "react";
import NavActivity from "./NavActivity";
import NavDirect from "./NavDirect";
import NavHome from "./NavHome";
import NavProfile from "./NavProfile";
import "./NavIcon.scss";
import {useSelector} from "react-redux";
import {State} from "../../store/types";

export type IconType = "home" | "activity" | "direct" | "profile";

interface Props extends React.HTMLAttributes<HTMLElement> {
	type: IconType;
	onIconClick: (type: IconType) => void;
	selected: boolean;
}
function NavIcon(props: Props) {
	const {isLoggedIn} = useSelector((state: State) => state)
	if (props.type === "activity" && isLoggedIn) {
		return <NavActivity className="nav-icon" {...props}></NavActivity>;
	}
	if (props.type === "home") {
		return <NavHome className="nav-icon" {...props}></NavHome>;
	}
	if (props.type === "profile") {
		return <NavProfile className="nav-icon" {...props}></NavProfile>;
	}
	if (props.type === "direct" && isLoggedIn) {
		return <NavDirect className="nav-icon" {...props}></NavDirect>;
	}
	return <></>;
}

export default NavIcon;
