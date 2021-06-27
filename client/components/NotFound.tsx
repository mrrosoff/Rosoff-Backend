import React from "react";

import { Link } from "react-router-dom";

import { Grid, Typography } from "@material-ui/core";

import Logo from "./UI/Logo";

const NotFound = (props: any) => {
	return (
		<Grid
			container
			spacing={6}
			style={{ height: "100vh" }}
			direction={"column"}
			justify={"center"}
			alignItems={"center"}
			alignContent={"center"}
		>
			<Grid item>
				<Logo height={120} />
			</Grid>
			<Grid
				item
				container
				spacing={5}
				style={{ width: "100%" }}
				direction={"column"}
				justify={"center"}
				alignItems={"center"}
				alignContent={"center"}
			>
				<Grid
					item
					container
					spacing={2}
					direction={"column"}
					justify={"center"}
					alignItems={"center"}
					alignContent={"center"}
				>
					<Grid item>
						<Typography variant={"h5"} align={"center"}>
							Page Not Found
						</Typography>
					</Grid>
					<Grid item>
						<Typography variant={"body1"} align={"center"}>
							Lost? Lets get you back on track.
						</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Grid item>
				<BackToSignInArea {...props} />
			</Grid>
		</Grid>
	);
};

const BackToSignInArea = (props: any) => {
	return (
		<Grid
			container
			spacing={1}
			justify={"center"}
			alignItems={"center"}
			alignContent={"center"}
		>
			<Grid item>
				<Typography variant={"body2"}>Head on back</Typography>
			</Grid>
			<Grid item>
				<Link to={"/login"}>
					<Typography variant={"body2"} color={"primary"}>
						Sign In
					</Typography>
				</Link>
			</Grid>
		</Grid>
	);
};

export default NotFound;
