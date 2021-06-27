import React from "react";

import { Link, useHistory } from "react-router-dom";

import {
	Box,
	Button,
	Divider,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Paper,
	Typography
} from "@material-ui/core";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import NavigateNextOutlinedIcon from "@material-ui/icons/NavigateNextOutlined";

import { useQuery, useMutation } from "@apollo/client";
import { GetContainersOverview } from "../../../graphql/query.js";
import { CreateContainer } from "../../../graphql/mutation.js";

const useStyles = makeStyles((theme) => ({
	hoverPaper: {
		cursor: "pointer",
		"&:hover": {
			boxShadow:
				"0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%)"
		}
	}
}));

const DashBoard = (props) => {
	return (
		<Box height={"100%"} display={"flex"} flexDirection={"column"}>
			<Box pr={4} flexGrow={1} minHeight={300} height={300} className={"verticalScrollDiv"}>
				<Grid container spacing={4} style={{ height: "100%" }}>
					<Containers />
				</Grid>
			</Box>
		</Box>
	);
};

const Containers = (props) => {
	const classes = useStyles();
	const history = useHistory();

	const { loading, error, data } = useQuery(GetContainersOverview, {
		pollInterval: 1000
	});

	const [createContainer] = useMutation(CreateContainer);

	if (error) return null;
	if (loading)
		return (
			<Grid item xs style={{ minWidth: 400 }}>
				<Skeleton variant="rect" width={"100%"} height={"100%"} />
			</Grid>
		);

	return (
		<Grid item xs style={{ minWidth: 400, maxWidth: 500 }}>
			<Paper
				style={{ height: "100%" }}
				className={classes.hoverPaper}
				onClick={() => history.replace({ pathname: "/app/containers" })}
			>
				<Box display={"flex"} flexDirection={"column"} height={"100%"}>
					<Typography
						variant={"h6"}
						style={{ paddingTop: 15, paddingBottom: 12, paddingLeft: 24 }}
					>
						Containers
					</Typography>
					<Divider />
					<Box p={1} flexGrow={1}>
						{data.selfLookup.containers.length > 0 ? (
							<List>
								{data.selfLookup.containers.map((container, index) => {
									return (
										<ListItem key={index}>
											<ListItemText
												primary={container.name || "Untitled Container"}
											/>
											<ListItemSecondaryAction>
												<IconButton
													onClick={(e) => {
														e.stopPropagation();
														history.replace({
															pathname:
																"/app/containers/" + container.id
														});
													}}
												>
													<NavigateNextOutlinedIcon />
												</IconButton>
											</ListItemSecondaryAction>
										</ListItem>
									);
								})}
							</List>
						) : (
							<Box
								p={3}
								display={"flex"}
								height={"100%"}
								flexDirection={"column"}
								justifyContent={"center"}
								alignItems={"center"}
							>
								<Box pb={1}>
									<SportsEsportsIcon color={"primary"} style={{ fontSize: 28 }} />
								</Box>
								<Typography style={{ fontSize: 17, fontWeight: 500 }}>
									You don't have any containers!
								</Typography>
								<Box pt={2}>
									<Button onClick={() => createContainer()}>
										<Box p={1}>
											<Typography variant={"subtitle2"} color={"primary"}>
												Create One
											</Typography>
										</Box>
									</Button>
								</Box>
							</Box>
						)}
					</Box>
				</Box>
			</Paper>
		</Grid>
	);
};

export default DashBoard;
