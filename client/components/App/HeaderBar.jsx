import { useRef, useState } from "react";

import { Box, Grid, IconButton } from "@material-ui/core";
import ForumIcon from "@material-ui/icons/Forum";

import Logo from "../UI/Logo.jsx";
import Search from "./HeaderBar/Search.jsx";
import Missions from "./HeaderBar/Missions.jsx";
import Notifications from "./HeaderBar/Notifications.jsx";
import Profile from "./HeaderBar/Profile.jsx";

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
		<Box ref={anchorRef} p={2} display={"flex"} flexWrap={"nowrap"} style={{ height: "100%" }}>
			<Messages {...props} />
			<Missions anchorRef={anchorRef} openDropdown={openDropdown} handleOpen={handleOpen} />
			<Notifications
				anchorRef={anchorRef}
				openDropdown={openDropdown}
				handleOpen={handleOpen}
			/>
		</Box>
	);
};

const Messages = (props) => {
	return (
		<Box pr={1}>
			<IconButton onClick={() => props.setOpenMessages(!props.openMessages)}>
				<ForumIcon />
			</IconButton>
		</Box>
	);
};

export default HeaderBar;
