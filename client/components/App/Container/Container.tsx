import React, {useState} from "react";

import {useLocation} from "react-router-dom";

import clsx from "clsx";
import {Box, Collapse, Divider, Grid, IconButton, makeStyles, Paper, Slider, Typography} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import {useMutation, useQuery, useSubscription} from "@apollo/client";
import {GetContainerData} from "../../../graphql/query";
import {ModifyContainer} from "../../../graphql/mutation";
import {SubscribeToContainerLogs} from "../../../graphql/subscription";

const useStyles = makeStyles((theme) => ({
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	}
}));

const Container = props =>
{
	const containerID = useLocation().pathname.split("/").slice(-1).join();
	const { loading, error, data } = useQuery(GetContainerData, {variables: {_id: containerID}});

	if (loading) return null;
	if (error) return null;

	return (
		<Box height={"100%"} display={"flex"} flexDirection={"column"}>
			<Box pr={4} flexGrow={1} height={500} className={"verticalScrollDiv"}>
				<Grid container spacing={4}>
					<InformationAndStatus data={data.container}/>
					<AccessDetails data={data.container}/>
					<ContainerSettings containerID={containerID} data={data.container}/>
					<LogOutput containerID={containerID} data={data.container}/>
				</Grid>
			</Box>
		</Box>
	);
}

const InformationAndStatus = props =>
{
	return (
		<Grid item xs style={{minWidth: 350}}>
			<Paper style={{height: "100%"}}>
				<Typography variant={"h6"} style={{paddingTop: 18, paddingBottom: 12, paddingLeft: 25}}>
					Information
				</Typography>
				<Divider />
				<Box p={4}>
					<Grid container direction={"column"}>
						<Grid item>
							<KeyValuePair name={"Name"} value={props.data.name}/>
						</Grid>
						<Grid item>
							<KeyValuePair name={"Status"} value={props.data.status}/>
						</Grid>
					</Grid>
				</Box>
			</Paper>
		</Grid>
	);
}

const KeyValuePair = props =>
{
	return (
		<Grid container spacing={1}>
			<Grid item>
				<Typography>
					{props.name}:
				</Typography>
			</Grid>
			<Grid item>
				<Typography>
					{props.value}
				</Typography>
			</Grid>
		</Grid>
	);
}

const AccessDetails = props =>
{
	const markdown = stripIndent(
		`
			\`\`\`
			${props.data.privateKey}
			\`\`\`
			`
	)

	return (
		<Grid item xs style={{minWidth: 450}}>
			<Paper style={{height: "100%"}}>
				<Typography variant={"h6"} style={{paddingTop: 18, paddingBottom: 12, paddingLeft: 25}}>
					Access Details
				</Typography>
				<Divider />
				<Box p={4}>
					<Typography variant={"subtitle2"}>Private Key</Typography>
					<ReactMarkdown plugins={[gfm]}>
						{markdown}
					</ReactMarkdown>
					<Typography variant={"subtitle2"}>
						ssh -i [privateKeyFile] root@{props.data.address}
					</Typography>
				</Box>
			</Paper>
		</Grid>
	)
}

const ContainerSettings = props =>
{
	const [cpuSlider, setCPUSlider] = useState(1);
	const [memSlider, setMemSlider] = useState(1);

	const [doMutation, { loading }] = useMutation(ModifyContainer, {
		onError: (err) => console.error(err)
	});

	const modifyContainer = (cpus, memLimit) => {
		doMutation({
			variables: { containerID: props.containerID, cpuCount: cpus, memLimit: memLimit + "m" }
		})
	}

	return(
		<Grid item xs style={{minWidth: 450}}>
			<Paper style={{height: "100%"}}>
				<Typography variant={"h6"} style={{paddingTop: 18, paddingBottom: 12, paddingLeft: 25}}>
					Container Settings
				</Typography>
				<Divider />
				<Box pl={4} pr={4} pt={1} pb={1}>
					<Typography>vCPU</Typography>
					<Slider
						marks
						value={cpuSlider}
						step={1} min={1} max={8}
						valueLabelDisplay={"auto"}
						onChangeCommitted={(e, newValue) => {
							setCPUSlider(newValue);
							modifyContainer(newValue);
						}}
					/>
					<Typography>Memory</Typography>
					<Slider
						marks
						value={memSlider}
						step={50} min={50} max={1000}
						valueLabelDisplay={"auto"}
						onChangeCommitted={(e, newValue) => {
							setMemSlider(newValue);
							modifyContainer(undefined, newValue);
						}}
					/>
				</Box>
			</Paper>
		</Grid>
	)
}

const LogOutput = props =>
{
	const classes = useStyles();
	const [expanded, setExpanded] = useState(false);

	const { loading, error, data } = useSubscription(SubscribeToContainerLogs, {
		variables: { _id: props.containerID }
	});

	if (loading) return null;
	else if (error) return null;

	let logs = data.getContainerLogs.logs;
	logs = logs.substr(logs.search("~# ") + 3)

	const markdown = stripIndent(
		`
			\`\`\`
			${logs}
			\`\`\`
			`
	)

	return(
		<Grid item xs style={{minWidth: 800}}>
			<Paper style={{height: "100%"}}>
				<Grid container
					  justify={"space-between"} alignContent={"center"} alignItems={"center"}
				>
					<Grid item>
						<Typography variant={"h6"} style={{paddingTop: 18, paddingBottom: 12, paddingLeft: 25}}>
							Logs
						</Typography>
					</Grid>
					<Grid item style={{paddingRight: 10}}>
						<IconButton
							className={clsx(classes.expand, {[classes.expandOpen]: expanded,})}
							onClick={() => setExpanded(expanded => !expanded)}
						>
							<ExpandMoreIcon />
						</IconButton>
					</Grid>
				</Grid>
				<Divider />
				<Collapse in={expanded} timeout="auto" unmountOnExit>
					<Box pl={4} pr={4} pt={1} pb={1}>
						<ReactMarkdown plugins={[gfm]}>
							{markdown}
						</ReactMarkdown>
					</Box>
				</Collapse>
			</Paper>
		</Grid>
	)
}

const stripIndent = (str) => {
	try {
		return str.split("\n").map(l => l.trim()).join('\n')
	} catch {
		return str
	}
}

export default Container;
