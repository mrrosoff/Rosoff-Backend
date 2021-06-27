import React from 'react';

import { Badge, Box, ClickAwayListener, Grid, Grow, IconButton, Popper } from "@material-ui/core";

import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";

const Notifications = (props) => {
	const handleClose = (event) => {
		if (props.anchorRef.current && props.anchorRef.current.contains(event.target)) return;
		props.handleOpen(null);
	};

	return (
		<>
			<Grid container justify={"center"} alignContent={"center"} alignItems={"center"}>
				<IconButton onClick={() => props.handleOpen("notifications")}>
					<Badge color="secondary" variant="dot">
						<NotificationsOutlinedIcon />
					</Badge>
				</IconButton>
			</Grid>
			<Popper
				open={props.openDropdown === "notifications"}
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
							p={1}
							width={350}
							height={250}
							bgcolor={"#FAFAFA"}
							border={2}
							borderColor={"neutral.mediumDark"}
						>
							<ClickAwayListener onClickAway={handleClose}>
								<Box p={1}></Box>
							</ClickAwayListener>
						</Box>
					</Grow>
				)}
			</Popper>
		</>
	);
};

export default Notifications;
