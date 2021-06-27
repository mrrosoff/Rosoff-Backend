import React, { useRef, useState } from "react";

import { Link, useHistory } from "react-router-dom";

import {
	Avatar,
	Button,
	Box,
	ClickAwayListener,
	Grid,
	Grow,
	Icon,
	IconButton,
	Popper,
	Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { useQuery } from "@apollo/client";
import { GetHeaderProfile } from "../../../graphql/query.js";

const useStyles = makeStyles((theme) => ({
	avatar: {
		width: theme.spacing(5),
		height: theme.spacing(5)
	}
}));

const Profile = (props) => {
	const classes = useStyles();

	const [open, setOpen] = useState(false);
	const anchorRef = useRef(null);

	const handleClose = (event) => {
		if (anchorRef && anchorRef.current && (anchorRef as any).current.contains(event.target)) {
			return;
		}
		setOpen(false);
	};

	const { loading, error, data } = useQuery(GetHeaderProfile);

	if (loading || error) return null;

	return (
		<>
			<Box
				{...({ ref: anchorRef } as any)}
				p={2}
				maxWidth={300}
				display={"flex"}
				flexWrap={"noWrap"}
				alignItems={"center"}
			>
				<Box pr={2}>
					<Avatar
						alt={"Profile"}
						src={data.selfLookup.avatar}
						className={classes.avatar}
					/>
				</Box>
				<Box pr={2}>
					<Typography variant={"subtitle2"}>{data.selfLookup.username}</Typography>
				</Box>
				<IconButton onClick={() => setOpen(!open)}>
					<ExpandMoreIcon />
				</IconButton>
			</Box>
			<ProfileDropdown open={open} handleClose={handleClose} anchorRef={anchorRef} />
		</>
	);
};

const ProfileDropdown = (props) => {
	const history = useHistory();
	return (
		<Popper open={props.open} anchorEl={props.anchorRef.current} transition>
			{({ TransitionProps, placement }) => (
				<Grow
					{...TransitionProps}
					style={{
						transformOrigin: placement === "bottom" ? "center top" : "center bottom"
					}}
				>
					<Box
						p={1}
						width={250}
						bgcolor={"#FAFAFA"}
						border={2}
						borderColor={"neutral.mediumDark"}
					>
						<ClickAwayListener onClickAway={props.handleClose}>
							<Box>
								<Link to={"/app/profile"} className={"no-line"}>
									<Button
										fullWidth
										style={{
											height: 50,
											borderRadius: 8,
											textTransform: "none"
										}}
									>
										<Grid
											container
											spacing={4}
											style={{ paddingLeft: 35 }}
											alignItems={"center"}
											alignContent={"center"}
										>
											<PersonIcon />
											<Grid item>
												<Typography>Profile</Typography>
											</Grid>
										</Grid>
									</Button>
								</Link>
								<Button
									fullWidth
									style={{
										height: 50,
										borderRadius: 8,
										textTransform: "none"
									}}
									onClick={() => {
										history.replace({ pathname: "/login" });
										localStorage.removeItem("token");
									}}
								>
									<Grid
										container
										spacing={4}
										style={{ paddingLeft: 35 }}
										alignItems={"center"}
										alignContent={"center"}
									>
										<ExitToAppIcon />
										<Grid item>
											<Typography>Logout</Typography>
										</Grid>
									</Grid>
								</Button>
							</Box>
						</ClickAwayListener>
					</Box>
				</Grow>
			)}
		</Popper>
	);
};

export default Profile;
