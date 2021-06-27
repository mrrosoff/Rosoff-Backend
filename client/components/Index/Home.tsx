import React from "react";

import { Link } from "react-router-dom";

import { Box } from "@material-ui/core";

import NavBar from "./NavBar";
import { HomePageLargeButton } from "../UI/Buttons";

const Home = (props: any) => {
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

const AppOptions = (props: any) => {
	return (
		<Box flexGrow={1} display={"flex"} justifyContent={"center"} alignItems={"center"}>
			<Box pl={4}>
				<Link to={"/login"}>
					<HomePageLargeButton>Open In Browser</HomePageLargeButton>
				</Link>
			</Box>
		</Box>
	);
};

const WaveDivider = (props: any) => {
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
