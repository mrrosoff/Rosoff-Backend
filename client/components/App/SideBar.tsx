import React from "react";

import { Link, useHistory, useLocation } from "react-router-dom";

import { Box, Button, Grid, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";

import { useMutation } from "@apollo/client";
import { CreateContainer } from "../../graphql/mutation.js";

const SideBar = (props) => {
	const menuEntries = [
		{ text: "Dashboard", icon: DashboardIcon, disabled: false },
		{ text: "Containers", icon: SportsEsportsIcon, disabled: false }
	];

	const history = useHistory();
	const location = useLocation();

	const [createContainer] = useMutation(CreateContainer, {
		onCompleted: (data) => history.replace({ pathname: "/app/containers/" + data.createContainer.id })
	});

	return (
		<Box
			width={"100%"}
			height={"100%"}
			display={"flex"}
			flexWrap={"nowrap"}
			flexDirection={"column"}
			justifyContent="center"
		>
			<Box>
				<Button
					fullWidth
					variant={"contained"}
					color={"primary"}
					style={{ height: 50, borderRadius: 8, textTransform: "none" }}
					onClick={() => createContainer()}
				>
					<Grid
						container
						spacing={3}
						justify={"center"}
						alignItems={"center"}
						alignContent={"center"}
					>
						<Grid item>
							<Typography>Create Container</Typography>
						</Grid>
						<AddIcon />
					</Grid>
				</Button>
			</Box>
			<Box mt={4} mb={6} flexGrow={1}>
				{menuEntries.map((item, index) => (
					<NavMenuItem
						key={index}
						icon={item.icon}
						active={location.pathname.includes(
							item.text.replace(" ", "-").toLowerCase()
						)}
						disabled={item.disabled}
					>
						{item.text}
					</NavMenuItem>
				))}
			</Box>
		</Box>
	);
};

const NavMenuItem = (props) => {
	const Icon = props.icon;

	const NavButton = (props) => {
		return (
			<Button
				fullWidth
				disabled={props.disabled}
				style={{ height: 50, borderRadius: 8, textTransform: "none" }}
			>
				<Grid
					container
					spacing={4}
					style={{ paddingLeft: 35 }}
					alignItems={"center"}
					alignContent={"center"}
				>
					<Icon color={props.active ? "primary" : undefined} />
					<Grid item>
						<Typography>{props.children}</Typography>
					</Grid>
				</Grid>
			</Button>
		);
	};

	return (
		<Box mt={1}>
			{props.disabled ? (
				<NavButton {...props} />
			) : (
				<Link
					to={`/app/${props.children.replace(" ", "-").toLowerCase()}`}
					className={"no-line"}
				>
					<NavButton {...props} />
				</Link>
			)}
		</Box>
	);
};

export default SideBar;
