import { useRef, useState } from "react";
import Measure from "react-measure";

import { useHistory } from "react-router-dom";

import {
	Avatar,
	Box,
	ClickAwayListener,
	Divider,
	Grow,
	IconButton,
	InputBase,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	ListItemSecondaryAction,
	Popper,
	Typography
} from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CheckIcon from "@material-ui/icons/Check";

import { useLazyQuery, useMutation } from "@apollo/client";
import { GetInfoFromSearch } from "../../../graphql/query.js";
import { RequestFriend } from "../../../graphql/mutation.js";
import Chess from "chess.js";

const Search = (props) => {
	const [searchText, setSearchText] = useState("");
	const [getSearchInfo, { loading, error, data }] = useLazyQuery(GetInfoFromSearch);

	const [requestFriend] = useMutation(RequestFriend, {
		update(cache, { data: { requestFriend } }) {
			cache.modify({
				fields: {
					selfLookup(existingSelfLookup = {}) {
						return {
							...existingSelfLookup,
							outgoingFriendrRequests: requestFriend.outgoingFriendRequests
						};
					}
				}
			});
		}
	});

	const [open, setOpen] = useState(false);
	const anchorRef = useRef(null);

	const mergeRefs = (...refs) => {
		const filteredRefs = refs.filter(Boolean);
		if (!filteredRefs.length) return null;
		if (filteredRefs.length === 0) return filteredRefs[0];
		return (inst) => {
			for (const ref of filteredRefs) {
				if (typeof ref === "function") {
					ref(inst);
				} else if (ref) {
					ref.current = inst;
				}
			}
		};
	};

	return (
		<Measure>
			{({ measureRef, contentRect }) => (
				<>
					<Box
						id={"searchBox"}
						p={2}
						minWidth={400}
						flexGrow={1}
						bgcolor={"neutral.light"}
						ref={mergeRefs(anchorRef, measureRef)}
						onClick={() => setOpen((prevOpen) => !prevOpen)}
					>
						<Box
							display={"flex"}
							alignItems={"center"}
							alignContent={"center"}
							style={{ height: "100%" }}
							ref={measureRef}
						>
							<Box mt={"4px"} ml={2}>
								<SearchOutlinedIcon />
							</Box>
							<Box flexGrow={1} ml={2} mr={2}>
								<InputBase
									fullWidth
									placeholder={"Search"}
									onChange={(e) => {
										setSearchText(e.target.value);
										getSearchInfo({ variables: { query: e.target.value } });
									}}
									value={searchText}
								/>
							</Box>
						</Box>
					</Box>
					{loading || error || !data ? null : (
						<SearchDropdown
							open={open}
							setOpen={setOpen}
							anchorRef={anchorRef}
							resizeWidth={contentRect.entry.width + 32}
							data={data}
							requestFriend={requestFriend}
							{...props}
						/>
					)}
				</>
			)}
		</Measure>
	);
};

const SearchDropdown = (props) => {
	return (
		<Popper
			open={props.open}
			anchorEl={props.anchorRef.current}
			style={{ zIndex: 999 }}
			transition
		>
			{({ TransitionProps, placement }) => (
				<Grow
					{...TransitionProps}
					style={{
						transformOrigin: placement === "bottom" ? "center top" : "center bottom"
					}}
				>
					<Box
						width={props.resizeWidth}
						bgcolor={"neutral.light"}
						border={2}
						borderColor={"neutral.mediumDark"}
						p={1}
					>
						<ClickAwayListener onClickAway={() => props.setOpen(false)}>
							<Box p={1}>
								<MatchSection {...props} />
								<FriendSection {...props} />
								<OtherSection {...props} />
							</Box>
						</ClickAwayListener>
					</Box>
				</Grow>
			)}
		</Popper>
	);
};

const MatchSection = (props) => {
	const history = useHistory();

	const data = props.data.selfLookup.matches.concat(props.data.matchSearch);
	return (
		<Box>
			<Typography color="textSecondary" style={{ fontSize: 18, fontWeight: 500 }}>
				Matches
			</Typography>
			<Divider />
			{data.length === 0 ? (
				<Box pt={2}>
					<Typography color="textPrimary" style={{ fontSize: 15, fontWeight: 500 }}>
						No matches found
					</Typography>
				</Box>
			) : (
				<List>
					{data.map((match, index) => (
						<ListItem key={index}>
							<AvatarGroup max={2} style={{ paddingRight: 20 }}>
								{match.players.map((player, index) => (
									<Avatar src={player.avatar} key={index} />
								))}
							</AvatarGroup>
							<ListItemText
								primary={match.name || "Untitled Match"}
								secondary={
									match.inProgress &&
									new Chess(match.fen).turn() ===
										(match.whitePlayer.username ===
										props.data.selfLookup.username
											? "w"
											: "b")
										? "Your Turn"
										: "Their Turn"
								}
							/>
							<ListItemSecondaryAction>
								<IconButton
									onClick={() =>
										history.replace({ pathname: "/app/matches/" + match._id })
									}
								>
									<ChevronRightIcon />
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					))}
				</List>
			)}
		</Box>
	);
};

const FriendSection = (props) => {
	const friendsInMyMatches = props.data.selfLookup.friends.filter((friend) => {
		const playerLists = friend.matches.map((match) =>
			match.players.map((player) => player.username)
		);
		for (let i = 0; i < playerLists.length; i++) {
			if (playerLists[i].includes(props.data.selfLookup.username)) return true;
		}
		return false;
	});

	const friendsNotInMyMatches = props.data.selfLookup.friends.filter(
		(friend) => !friendsInMyMatches.map((friend) => friend.username).includes(friend.username)
	);

	const data = friendsInMyMatches.concat(friendsNotInMyMatches);

	return (
		<Box pt={2}>
			<Typography color="textSecondary" style={{ fontSize: 18, fontWeight: 500 }}>
				Friends
			</Typography>
			<Divider />
			{!props.data.selfLookup.friends ? (
				<Box pt={2}>
					<Typography color="textPrimary" style={{ fontSize: 15, fontWeight: 500 }}>
						No friends found
					</Typography>
				</Box>
			) : (
				<List>
					{data.map((friend, index) => (
						<ListItem key={index}>
							<ListItemAvatar>
								<Avatar src={friend.avatar} />
							</ListItemAvatar>
							<ListItemText>{friend.username}</ListItemText>
							<ListItemSecondaryAction>
								<Box display={"flex"}>
									<Box pr={1}>
										<IconButton
											onClick={() => {
												props.setActiveMessageUser(friend.username);
												props.setOpenMessages(true);
												props.setOpen(false);
											}}
										>
											<ChatBubbleOutlineIcon />
										</IconButton>
									</Box>
									<IconButton
										onClick={() =>
											props.requestFriend({
												variables: {
													friendUsername: user.username
												}
											})
										}
									>
										<AddCircleIcon />
									</IconButton>
								</Box>
							</ListItemSecondaryAction>
						</ListItem>
					))}
				</List>
			)}
		</Box>
	);
};

const OtherSection = (props) => {
	const data = props.data.userSearch.filter(
		(user) =>
			!props.data.selfLookup.friends
				.map((friend) => friend.username)
				.includes(user.username) && props.data.selfLookup.username !== user.username
	);

	return (
		<Box pt={2}>
			<Typography color="textSecondary" style={{ fontSize: 18, fontWeight: 500 }}>
				Other
			</Typography>
			<Divider />
			<List>
				{data.map((user, index) => {
					const disabled = props.data.selfLookup.outgoingFriendRequests
						.map((user) => user.username)
						.includes(user.username);
					return (
						<ListItem key={index}>
							<AvatarGroup max={2} style={{ paddingRight: 20 }}>
								<Avatar src={user.avatar} key={index} />
							</AvatarGroup>
							<ListItemText primary={user.username} />
							<ListItemSecondaryAction>
								<Box
									display={"flex"}
									justifyContent={"center"}
									alignItems={"center"}
								>
									<IconButton
										onClick={() =>
											props.requestFriend({
												variables: {
													friendUsername: user.username
												}
											})
										}
										disabled={disabled}
									>
										{disabled ? <CheckIcon /> : <PersonAddIcon />}
									</IconButton>
								</Box>
							</ListItemSecondaryAction>
						</ListItem>
					);
				})}
			</List>
		</Box>
	);
};

export default Search;
