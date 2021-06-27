import React, { useState } from "react";

import { Box, Button, Paper, TextField, Typography } from "@material-ui/core";

import { useQuery } from "@apollo/client";
import { GetTraditionalProfile } from "../../../graphql/query.js";

const Profile = (props) => {
	return (
		<Box display={"flex"}>
			<Box>
				<UserDetails />
			</Box>
		</Box>
	);
};

const UserDetails = (props) => {
	const { loading, error, data } = useQuery(GetTraditionalProfile);

	if (loading || error) return null;

	return (
		<Box display={"flex"} flexDirection={"column"}>
			<Paper>
				<Box p={4} display={"flex"} alignContent={"center"} alignItems={"center"}>
					<Box>
						<img
							alt={"User Profile"}
							src={data.selfLookup.avatar}
							style={{ width: 100, height: 100, borderRadius: "50%" }}
						/>
					</Box>
					<Box ml={4} flexGrow={1}>
						<Typography variant={"h4"}>{data.selfLookup.username}</Typography>
						{data.selfLookup.rating && (
							<Typography variant={"h6"}>Rating: {data.user.rating}</Typography>
						)}
						<Box pt={2}>
							<Typography variant={"h6"}>
								Wins: {data.selfLookup.playerStatistics.wins}
							</Typography>
							<Typography variant={"h6"}>
								Losses: {data.selfLookup.playerStatistics.losses}
							</Typography>
							<Typography variant={"h6"}>
								Stalemates: {data.selfLookup.playerStatistics.stalemates}
							</Typography>
						</Box>
					</Box>
				</Box>
			</Paper>
			<Box mt={4} flexGrow={1}>
				<EditUserInfo />
			</Box>
		</Box>
	);
};

const EditUserInfo = (props) => {
	return (
		<Paper>
			<Box p={4} display={"flex"} flexDirection={"column"}>
				<Field name={"Email"} input={<TextField />} />
				<Field mt={2} name={"Password"} input={<TextField />} />
			</Box>
		</Paper>
	);
};

const Field = (props) => {
	const [editField, setEditField] = useState(false);

	return (
		<Box
			mt={props.mt}
			display={"flex"}
			justifyContent={editField ? undefined : "space-between"}
		>
			<Typography variant={"h6"}>{props.name}</Typography>
			{editField ? (
				<Box ml={2}>{props.input}</Box>
			) : (
				<Button
					variant={"contained"}
					color={"secondary"}
					onClick={() => setEditField(true)}
				>
					Edit
				</Button>
			)}
		</Box>
	);
};

export default Profile;
