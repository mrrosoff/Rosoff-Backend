import {
	Badge,
	Box,
	ClickAwayListener,
	Divider,
	Grid,
	Grow,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Popper
} from "@material-ui/core";
import MapIcon from "@material-ui/icons/Map";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import { useQuery } from "@apollo/client";
import { GetMissions } from "../../../graphql/query.js";

const Missions = (props) => {
	const handleClose = (event) => {
		if (props.anchorRef.current && props.anchorRef.current.contains(event.target)) return;
		props.handleOpen(null);
	};

	const { loading, error, data } = useQuery(GetMissions);

	if (loading || error) return null;

	return (
		<>
			<Box pr={1}>
				<Grid container justify={"center"} alignContent={"center"} alignItems={"center"}>
					<IconButton onClick={() => props.handleOpen("missions")}>
						<MapIcon />
					</IconButton>
				</Grid>
			</Box>
			<Popper
				open={props.openDropdown === "missions"}
				anchorEl={props.anchorRef.current}
				transition
				style={{ zIndex: 999 }}
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin: placement === "bottom" ? "center top" : "center bottom"
						}}
					>
						<Box
							width={350}
							height={250}
							bgcolor={"#FAFAFA"}
							border={2}
							borderColor={"neutral.mediumDark"}
						>
							<ClickAwayListener onClickAway={handleClose}>
								<Box p={2}>
									<Typography
										color="textSecondary"
										style={{ fontSize: 18, fontWeight: 500 }}
									>
										Current Missions
									</Typography>
									<Divider />
									<List>
										{data.selfLookup.missions.length === 0 ? (
											<Box pt={2}>
												<Typography
													color="textPrimary"
													style={{ fontSize: 15, fontWeight: 500 }}
												>
													You have no current missions
												</Typography>
											</Box>
										) : (
											<CurrentMissions data={data} />
										)}
									</List>
								</Box>
							</ClickAwayListener>
						</Box>
					</Grow>
				)}
			</Popper>
		</>
	);
};

const XPLoader = (props) => {
	return (
		<Box mr={2} position="relative">
			<CircularProgress
				size={55}
				variant="determinate"
				value={100}
				color={"secondary"}
				style={{
					position: "absolute",
					top: 0,
					left: 0
				}}
			/>
			<CircularProgress size={55} variant="determinate" {...props} />

			<Box
				position="absolute"
				top="50%"
				left="50%"
				display="flex"
				alignItems="center"
				justifyContent="center"
				style={{ transform: "translate(-50%, -50%)" }}
			>
				<Typography variant="caption" color="textSecondary">{`${Math.round(
					props.value
				)}%`}</Typography>
			</Box>
		</Box>
	);
};

const CurrentMissions = (props) => {
	return (
		<List>
			{props.data.selfLookup.missions.map((mission, index) => (
				<ListItem key={index}>
					<XPLoader value={(mission.progress / mission.threshold) * 100} />

					<ListItemText
						primary={mission.name}
						secondary={
							<Typography variant={"caption"} style={{ fontWeight: 500 }}>
								{mission.description}
							</Typography>
						}
					/>
				</ListItem>
			))}
		</List>
	);
};

export default Missions;
