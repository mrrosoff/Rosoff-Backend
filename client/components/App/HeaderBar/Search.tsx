import React, { useRef, useState } from "react";

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
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import Measure from "react-measure";

import { useLazyQuery } from "@apollo/client";
import { GetInfoFromSearch } from "../../../graphql/query.js";

const Search = (props) => {
	const [searchText, setSearchText] = useState("");
	const [getSearchInfo, { loading, error, data }] = useLazyQuery(GetInfoFromSearch);

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
						{...({ ref: mergeRefs(anchorRef, measureRef) } as any)}
						id={"searchBox"}
						p={2}
						minWidth={400}
						flexGrow={1}
						bgcolor={"neutral.light"}
						onClick={() => setOpen((prevOpen) => !prevOpen)}
					>
						<Box
							{...({ ref: measureRef } as any)}
							display={"flex"}
							alignItems={"center"}
							alignContent={"center"}
							style={{ height: "100%" }}
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
								<ContainerSection {...props} />
							</Box>
						</ClickAwayListener>
					</Box>
				</Grow>
			)}
		</Popper>
	);
};

const ContainerSection = (props) => {
	const history = useHistory();

	const data = props.data.selfLookup.containers.concat(props.data.matchSearch);
	return (
		<Box>
			<Typography color="textSecondary" style={{ fontSize: 18, fontWeight: 500 }}>
				Containers
			</Typography>
			<Divider />
			{data.length === 0 ? (
				<Box pt={2}>
					<Typography color="textPrimary" style={{ fontSize: 15, fontWeight: 500 }}>
						No containers found
					</Typography>
				</Box>
			) : (
				<List>
					{data.map((container, index) => (
						<ListItem key={index}>
							<ListItemText primary={container.name || "Untitled Container"} />
							<ListItemSecondaryAction>
								<IconButton
									onClick={() =>
										history.replace({
											pathname: "/app/containers/" + container.id
										})
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

export default Search;
