import { useEffect, useState } from "react";

import {
	Avatar,
	Box,
	Divider,
	IconButton,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
	TextField,
	Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import SendIcon from "@material-ui/icons/Send";
import NavigateNextOutlinedIcon from "@material-ui/icons/NavigateNextOutlined";
import clsx from "clsx";

import moment from "moment";

import { useQuery, useMutation } from "@apollo/client";
import { GetMessages } from "../../graphql/query.js";
import { SendMessage } from "../../graphql/mutation.js";
import { NewMessage } from "../../graphql/subscription.js";

import HeaderBar from "./HeaderBar.jsx";
import SideBar from "./SideBar.jsx";

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
	const [openMessages, setOpenMessages] = useState(false);
	const [activeMessageUser, setActiveMessageUser] = useState(null);

	const { loading, error, data, subscribeToMore } = useQuery(GetMessages);

	const [sendMessage] = useMutation(SendMessage, {
		update(cache, { data: { sendMessage } }) {
			cache.modify({
				fields: {
					selfLookup(existingSelfLookup = {}) {
						return {
							...existingSelfLookup,
							messages: existingSelfLookup.messages
								? [...existingSelfLookup.messages, sendMessage]
								: [sendMessage]
						};
					}
				}
			});
		}
	});

	useEffect(() => {
		subscribeToMore({
			document: NewMessage,
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev;
				return {
					...prev,
					selfLookup: {
						...prev.selfLookup,
						messages: [
							...(prev.selfLookup.messages || []),
							{
								...subscriptionData.data.newMessage,
								from: {
									username: subscriptionData.data.newMessage.from
								}
							}
						]
					}
				};
			}
		});
	}, []);

	return (
		<Box width={"100vw"} minHeight={"100vh"}>
			<Box height={75}>
				<HeaderBar
					openMessages={openMessages}
					setOpenMessages={setOpenMessages}
					setActiveMessageUser={setActiveMessageUser}
					{...props}
				/>
			</Box>
			<Box display={"flex"} flexWrap={"nowrap"} minHeight={"calc(100vh - 75px)"}>
				<Box minWidth={280} p={4} bgcolor={"neutral.light"}>
					<SideBar {...props} />
				</Box>
				<Box flexGrow={1} p={4} bgcolor={"neutral.medium"}>
					{props.children}
				</Box>
				<Box
					bgcolor={"neutral.light"}
					className={clsx(classes.drawer, { [classes.drawerShift]: openMessages })}
					minWidth={0}
					width={0}
				>
					<Box
						width={drawerWidth}
						height={"100%"}
						display={"flex"}
						flexDirection={"column"}
					>
						<Grid
							container
							alignItems={"center"}
							justify={"space-between"}
							style={{
								paddingTop: 10,
								paddingBottom: 10,
								paddingLeft: 20,
								paddingRight: 20,
								minHeight: 65
							}}
						>
							<Typography variant={"h6"}>Messages</Typography>
							{activeMessageUser ? (
								<IconButton onClick={() => setActiveMessageUser(null)}>
									<HomeIcon />
								</IconButton>
							) : null}
						</Grid>
						<Divider />
						{loading || error ? null : (
							<Messages
								data={data}
								sendMessage={sendMessage}
								activeMessageUser={activeMessageUser}
								setActiveMessageUser={setActiveMessageUser}
							/>
						)}
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

const Messages = (props) => {
	const [message, setMessage] = useState("");

	if (!props.activeMessageUser) return <MessagesHome {...props} />;

	const messagesWithUser = props.data.selfLookup.messages.filter(
		(message) =>
			message.to.username === props.activeMessageUser ||
			message.from.username === props.activeMessageUser
	);
	const sortedByDate = messagesWithUser.sort(
		(a, b) => new Date(a.message.date) > new Date(b.message.date)
	);

	return (
		<Box flexGrow={1} display={"flex"} flexDirection={"column"} height={"100%"}>
			<Box
				pt={3}
				pb={3}
				flexGrow={1}
				minHeight={250}
				height={250}
				className={"verticalScrollDiv"}
			>
				<Box display={"flex"} flexDirection={"column"}>
					{sortedByDate.map((message, index) => {
						const fromMe = message.from.username === props.data.selfLookup.username;
						return (
							<Box
								key={index}
								mt={2}
								display={"flex"}
								justifyContent={fromMe ? "flex-end" : "flex-start"}
							>
								<Box pl={3} pr={3}>
									<Box
										pt={1}
										pb={1}
										pl={2}
										pr={2}
										width={180}
										borderRadius={Math.floor(
											(15 / message.message.length) * 50
										)}
										bgcolor={fromMe ? "primary.main" : "secondary.main"}
									>
										<Typography style={{ color: fromMe ? "#FFF" : "#000" }}>
											{message.message}
										</Typography>
									</Box>
									<Box pr={1}>
										<Typography
											style={{
												color: "#555",
												fontSize: 12,
												textAlign: "right"
											}}
										>
											{moment(message.date).format("MMMM Do, h:mm a")}
										</Typography>
									</Box>
								</Box>
							</Box>
						);
					})}
				</Box>
			</Box>
			<Divider />
			<Box p={2} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
				<TextField
					fullWidth
					placeholder={"Message"}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							if (message === "") return;
							props.sendMessage({
								variables: {
									friendUsername: props.activeMessageUser,
									message: message
								}
							});
							setMessage("");
						}
					}}
				/>
				<Box pl={2}>
					<IconButton
						disabled={message === ""}
						onClick={() => {
							props.sendMessage({
								variables: {
									friendUsername: props.activeMessageUser,
									message: message
								}
							});
							setMessage("");
						}}
					>
						<SendIcon />
					</IconButton>
				</Box>
			</Box>
		</Box>
	);
};

const MessagesHome = (props) => {
	if (props.data.selfLookup.messages.length === 0) {
		return (
			<Box p={3}>
				<Typography>
					You Have No Messages. Use The Search To Find Someone To Message.
				</Typography>
			</Box>
		);
	}

	const dataByUser = props.data.selfLookup.messages.reduce((array, message) => {
		const user =
			message.from.username === props.data.selfLookup.username
				? message.to.username
				: message.from.username;
		const avatar =
			message.from.username === props.data.selfLookup.username
				? message.to.avatar
				: message.from.avatar;
		const pos = array.map((element) => element.username).indexOf(user);
		if (pos === -1) array.push({ username: user, avatar: avatar });
		return array;
	}, []);

	return (
		<Box p={2}>
			<List>
				{dataByUser.map((userObj, index) => (
					<ListItem key={index}>
						<ListItemAvatar>
							<Avatar src={userObj.avatar} />
						</ListItemAvatar>
						<ListItemText primary={userObj.username} />
						<ListItemSecondaryAction>
							<IconButton
								onClick={() => {
									props.setActiveMessageUser(userObj.username);
								}}
							>
								<NavigateNextOutlinedIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				))}
			</List>
		</Box>
	);
};

export default AppLayout;
