import { useRef, useState } from "react";

import { Link } from "react-router-dom";

import {
	Box,
	ClickAwayListener,
	Grow,
	List,
	ListItem,
	Popper,
	Typography
} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";

import { useSnackbar } from "notistack";

import NavBar from "./NavBar.jsx";

import { HomePageLargeButton } from "../UI/Buttons.jsx";

const Home = (props) => {
	return (
		<Box width={"100vw"} height={"100vh"}>
			<Box width={"100%"} height={"100%"}>
				<Box
					id={"download"}
					minHeight={626}
					display={"flex"}
					flexDirection={"column"}
					bgcolor={"primary.main"}
				>
					<Box>
						<NavBar />
					</Box>
					<AppOptions />
				</Box>
				<Box id={"overview"} minHeight={626}></Box>
				<WaveDivider />
				<Box id={"more"} minHeight={626} bgcolor={"neutral.mediumDark"}></Box>
				<WaveDivider flip />
				<Box minHeight={626}></Box>
			</Box>
		</Box>
	);
};

const AppOptions = (props) => {
	const getOS = () => {
		const platform = window.navigator.platform;
		const macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"];
		const windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];

		if (macosPlatforms.indexOf(platform) !== -1) {
			return "MacOS";
		} else if (windowsPlatforms.indexOf(platform) !== -1) {
			return "Windows";
		} else if (/Linux/.test(platform)) {
			return "Linux";
		}
		return null;
	};

	return (
		<Box flexGrow={1} display={"flex"} justifyContent={"center"} alignItems={"center"}>
			<Box pr={4}>
				<ElectronButton operatingSystem={getOS()} />
			</Box>
			<Box pl={4}>
				<Link to={"/login"}>
					<HomePageLargeButton>Open In Browser</HomePageLargeButton>
				</Link>
			</Box>
		</Box>
	);
};

const ElectronButton = (props) => {
	const [open, setOpen] = useState(false);
	const anchorRef = useRef(null);

	const { enqueueSnackbar } = useSnackbar();

	const downloadClient = (operatingSystem) => {
		const repoUrl = "https://github.com/M3tanym/Kings-Corner";
		const windowsUrl = repoUrl + "/releases/latest/download/kings-corner.exe";
		const macOSUrl = repoUrl + "/releases/latest/download/kings-corner.dmg";
		switch (operatingSystem) {
			case "Windows":
				doDownload(windowsUrl);
				break;
			case "MacOS":
				doDownload(macOSUrl);
				break;
			default:
				enqueueSnackbar("Unspecified Platform", "error");
		}
	};

	const doDownload = (link) => {
		let a = document.createElement("a");
		a.href = link;
		a.download = link.substring(link.indexOf("download/") + 1);
		document.body.appendChild(a);
		a.click();
		setTimeout(() => document.body.removeChild(a), 0);
	};

	return (
		<Box ref={anchorRef}>
			<HomePageLargeButton
				onClick={() => {
					if (props.operatingSystem === "Linux") setOpen(true);
					else downloadClient(props.operatingSystem);
				}}
			>
				<Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
					<GetAppIcon style={{ paddingTop: 2, marginRight: 10 }} />
					{"Download For " + props.operatingSystem}
				</Box>
			</HomePageLargeButton>
			<ElectronDropDown
				open={open}
				setOpen={setOpen}
				anchorRef={anchorRef}
				downloadClient={downloadClient}
				{...props}
			/>
		</Box>
	);
};

const ElectronDropDown = (props) => {
	const handleClose = (event) => {
		if (props.anchorRef.current && props.anchorRef.current.contains(event.target)) return;
		props.setOpen(false);
	};

	return (
		<Popper open={props.open} anchorEl={props.anchorRef.current} transition>
			{({ TransitionProps, placement }) => (
				<Grow
					{...TransitionProps}
					style={{
						transformOrigin: placement === "bottom" ? "center top" : "center bottom"
					}}
				>
					<Box
						width={275}
						height={150}
						bgcolor={"#FAFAFA"}
						boxShadow={1}
						borderTop={0}
						borderRadius={10}
					>
						<ClickAwayListener onClickAway={handleClose}>
							<Box p={1}>
								<List>
									<ListItem
										button
										onClick={() => props.downloadClient(props.operatingSystem)}
									>
										<Typography variant={"body1"}>.deb</Typography>
									</ListItem>
									<ListItem
										button
										onClick={() => props.downloadClient(props.operatingSystem)}
									>
										<Typography variant={"body1"}>.rpm</Typography>
									</ListItem>
									<ListItem
										button
										onClick={() => props.downloadClient(props.operatingSystem)}
									>
										<Typography variant={"body1"}>tar.gz</Typography>
									</ListItem>
								</List>
							</Box>
						</ClickAwayListener>
					</Box>
				</Grow>
			)}
		</Popper>
	);
};

const WaveDivider = (props) => {
	return (
		<Box
			color={"neutral.mediumDark"}
			style={{ transform: props.flip ? "matrix(1,0,0,-1,0,0)" : undefined }}
		>
			<svg style={{ display: "block" }} viewBox="0 0 1440 100" preserveAspectRatio="none">
				<path
					className={"wave"}
					fill="currentColor"
					d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
				/>
			</svg>
		</Box>
	);
};

export default Home;
