import React, { useContext } from "react";

import { Link } from "react-router-dom";

import { Box, Grid, IconButton, Paper, Typography } from "@material-ui/core";
import NavigateNextOutlinedIcon from "@material-ui/icons/NavigateNextOutlined";

import { useQuery } from "@apollo/client";
import { GetContainersOverview } from "../../../graphql/query";

const Containers = (props) => {
	const { loading, error, data } = useQuery(GetContainersOverview);

	if (loading || error) return null;

	console.log(data);

	return (
		<Box height={"100%"} display={"flex"} flexDirection={"column"}>
			<Box pr={4} flexGrow={1} height={500} className={"verticalScrollDiv"}>
				<Grid container spacing={4}>
					{data.selfLookup.containers.map((container, index) => (
						<Grid item key={index}>
							<ContainerPaper container={container} />
						</Grid>
					))}
				</Grid>
			</Box>
		</Box>
	);
};

const ContainerPaper = (props) => {
	return (
		<Paper style={{ width: 400, height: 300 }}>
			<Box p={3}>
				<Grid
					container
					spacing={2}
					justify={"space-between"}
					alignItems={"center"}
					alignContent={"center"}
				>
					<Grid item>
						<Grid container direction={"column"}>
							<Grid item>
								<Typography variant={"body1"}>{props.container.name}</Typography>
							</Grid>
							<Grid item>
								<Typography variant={"body2"}>{props.container.status}</Typography>
							</Grid>
							<Grid item>
								<Typography variant={"body2"}>{props.container.address}</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item style={{ marginLeft: "auto" }}>
						<Link to={"/app/containers/" + props.container._id}>
							<IconButton>
								<NavigateNextOutlinedIcon />
							</IconButton>
						</Link>
					</Grid>
				</Grid>
			</Box>
		</Paper>
	);
};

export default Containers;
