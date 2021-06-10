import { useEffect, useState } from "react";

import { Box, Grid, Hidden, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

import { motion } from "framer-motion";

import Carousel1 from "../../static/images/carousel/carousel1.jpg";
import Carousel2 from "../../static/images/carousel/carousel2.jpg";
import Carousel3 from "../../static/images/carousel/carousel3.jpg";
import Carousel4 from "../../static/images/carousel/carousel4.jpg";

const useStyles = makeStyles((theme) => ({
	rootPadding: {
		[theme.breakpoints.up("xs")]: {
			padding: theme.spacing(0)
		},
		[theme.breakpoints.up("sm")]: {
			padding: theme.spacing(8)
		},
		[theme.breakpoints.up("lg")]: {
			padding: theme.spacing(10)
		},
		[theme.breakpoints.up("xl")]: {
			padding: theme.spacing(20)
		}
	},
	loginSection: {
		padding: theme.spacing(4),
		[theme.breakpoints.up("xs")]: {
			width: "100%"
		},
		[theme.breakpoints.up("sm")]: {
			minWidth: 475
		}
	}
}));

const Layout = (props) => {
	const classes = useStyles();
	return (
		<>
			<Box className={"background-image"} />
			<Box width={"100vw"} height={"100vh"} className={classes.rootPadding}>
				<Paper elevation={8} style={{ height: "100%" }} square>
					<Box height={"100%"} display={"flex"} alignItems={"center"}>
						<Hidden xsDown>
							<ImageCarousel />
						</Hidden>
						<Box height={"100%"} className={classes.loginSection}>
							{props.children}
						</Box>
					</Box>
				</Paper>
			</Box>
		</>
	);
};

const ImageCarousel = (props) => {
	const [carouselActiveIndex, setCarouselActiveIndex] = useState(0);

	let images = [Carousel1, Carousel2, Carousel3, Carousel4];

	useEffect(() => {
		let nextImageTimer = setInterval(() => {
			setCarouselActiveIndex((prevIndex) => {
				if (prevIndex < images.length - 1) return prevIndex + 1;
				else return 0;
			});
		}, 8000);
		return () => clearInterval(nextImageTimer);
	}, []);

	return (
		<Box flexGrow={1} height={"100%"} position={"relative"} style={{ overflow: "hidden" }}>
			<img
				alt={"Chess Background"}
				src={images[carouselActiveIndex]}
				style={{
					objectFit: "cover",
					width: "100%",
					minHeight: "100%"
				}}
			/>
			<Hidden smDown>
				<Box style={{ width: "100%", position: "absolute", bottom: 30 }}>
					<Grid
						container
						spacing={2}
						justify={"center"}
						alignItems={"center"}
						alignContent={"center"}
					>
						{images.map((_, i) => (
							<Grid item key={i}>
								<CarouselIndicator
									active={carouselActiveIndex === i}
									onClick={() => setCarouselActiveIndex(i)}
								/>
							</Grid>
						))}
					</Grid>
				</Box>
			</Hidden>
		</Box>
	);
};

const CarouselIndicator = (props) => {
	const variants = {
		active: { width: 30, backgroundColor: "#FFFFFF" },
		other: { width: 10, backgroundColor: grey[300] }
	};

	return (
		<motion.div
			animate={props.active ? "active" : "other"}
			variants={variants}
			style={{ height: 10, borderRadius: 10 }}
			onClick={props.onClick}
		/>
	);
};

export default Layout;
