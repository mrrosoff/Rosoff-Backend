import React, { useRef, useState } from "react";

import { Box, Grid } from "@material-ui/core";

import Logo from "../UI/Logo";
import Search from "./HeaderBar/Search";
import Notifications from "./HeaderBar/Notifications";
import Profile from "./HeaderBar/Profile";

const HeaderBar = (props) => {
	return (
		<Box display={"flex"} flexWrap={"nowrap"} style={{ height: "100%" }}>
			<LogoHeader />
			<Search {...props} />
			<ActionButtons
				openMessages={props.openMessages}
				setOpenMessages={props.setOpenMessages}
			/>
			<Profile />
		</Box>
	);
};

const LogoHeader = (props) => {
	return (
		<Box p={2} minWidth={280}>
			<Grid item container justify={"center"} alignItems={"center"} alignContent={"center"}>
				<Grid item>
					<Logo height={50} />
				</Grid>
			</Grid>
		</Box>
	);
};

const ActionButtons = (props) => {
	const anchorRef = useRef(null);
	const [openDropdown, setOpenDropdown] = useState(null);
	const handleOpen = (clicked) => {
		if (openDropdown && openDropdown === clicked) {
			setOpenDropdown(null);
		} else {
			setOpenDropdown(clicked);
		}
	};

	return (
		<Box {...{ ref: anchorRef } as any} p={2} display={"flex"} flexWrap={"nowrap"} style={{ height: "100%" }}>
			<Notifications
				anchorRef={anchorRef}
				openDropdown={openDropdown}
				handleOpen={handleOpen}
			/>
		</Box>
	);
};

export default HeaderBar;
