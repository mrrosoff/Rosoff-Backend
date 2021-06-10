import { useState } from "react";

import { Link } from "react-router-dom";

import {
	Avatar,
	Box,
	Button,
	Divider,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
	Paper,
	TextField,
	Typography
} from "@material-ui/core";
import NavigateNextOutlinedIcon from "@material-ui/icons/NavigateNextOutlined";

import { useQuery } from "@apollo/client";
import { GetMatchHistory, GetTraditionalProfile } from "../../../graphql/query.js";

const Profile = (props) => {
	return (
		<Box display={"flex"}>
			<Box>
				<UserDetails />
			</Box>
			<Box ml={4} flexGrow={1}>
				<MatchHistory />
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

const MatchHistory = (props) => {
	const { loading, error, data } = useQuery(GetMatchHistory);

	if (loading || error) return null;

	return (
		<Paper style={{ height: "100%" }}>
			<Grid container justify={"space-between"} alignContent={"center"} alignItems={"center"}>
				<Grid item>
					<Typography
						variant={"h6"}
						style={{ paddingTop: 18, paddingBottom: 12, paddingLeft: 25 }}
					>
						Match History
					</Typography>
				</Grid>
				<Grid item style={{ paddingRight: 10 }}>
					<Link to={`/app/match-history`}>
						<IconButton>
							<NavigateNextOutlinedIcon />
						</IconButton>
					</Link>
				</Grid>
			</Grid>
			<Divider />
			<Box p={1}>
				<List>
					{data.selfLookup.finishedMatches.map((match, index) => (
						<ListItem key={index}>
							<ListItemAvatar>
								<Avatar />
							</ListItemAvatar>
							<ListItemText primary={"Match Name"} secondary={"Your Turn"} />
							<ListItemSecondaryAction>
								<Link to={"/app/matches/" + index}>
									<IconButton>
										<NavigateNextOutlinedIcon />
									</IconButton>
								</Link>
							</ListItemSecondaryAction>
						</ListItem>
					))}
				</List>
			</Box>
		</Paper>
	);
};

export default Profile;
