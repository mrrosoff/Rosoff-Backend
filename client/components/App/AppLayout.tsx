import React from "react";

import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import HeaderBar from "./HeaderBar";
import SideBar from "./SideBar";

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
	content: {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	contentShift: {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginRight: drawerWidth
	},
	drawer: {
		transition: theme.transitions.create("min-width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	drawerShift: {
		transition: theme.transitions.create("min-width", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		minWidth: drawerWidth
	}
}));

const AppLayout = (props) => {
	const classes = useStyles();

	return (
		<Box width={"100vw"} minHeight={"100vh"}>
			<Box height={75}>
				<HeaderBar {...props} />
			</Box>
			<Box display={"flex"} flexWrap={"nowrap"} minHeight={"calc(100vh - 75px)"}>
				<Box minWidth={280} p={4} bgcolor={"neutral.light"}>
					<SideBar {...props} />
				</Box>
				<Box flexGrow={1} p={4} bgcolor={"neutral.medium"}>
					{props.children}
				</Box>
			</Box>
		</Box>
	);
};

export default AppLayout;
