import React, { useRef } from "react";

import { Box, CssBaseline, Hidden, Typography } from "@material-ui/core";
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { from, split, HttpLink } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";

import { setContext } from "@apollo/client/link/context";

import { SnackbarProvider } from "notistack";

import Router from "./Router";

declare module "@material-ui/core/styles/createPalette" {
	interface NeutralPaletteOptions {
		main: Palette["primary"]["main"];
		light: Palette["primary"]["main"];
		medium: Palette["primary"]["main"];
		mediumDark: Palette["primary"]["main"];
		dark: Palette["primary"]["main"];
	}
	interface PaletteOptions {
		neutral?: NeutralPaletteOptions;
	}
}

const App = () => {
	let theme = createMuiTheme({
		palette: {
			type: "light",
			primary: { main: "#653D23" },
			secondary: { main: "#E2AF6E" },
			neutral: {
				main: "#FFFFFF",
				light: grey[100],
				medium: grey[200],
				mediumDark: grey[300],
				dark: grey[600]
			}
		}
	});
	theme = responsiveFontSizes(theme);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Hidden only={"xs"}>
				<FullApp />
			</Hidden>
			<Hidden smUp>
				<MobileApp />
			</Hidden>
		</ThemeProvider>
	);
};

const FullApp = (props: any) => {
	const providerRef: any = useRef();

	const httpLink = new HttpLink({
		uri: "/graphql",
		credentials: "same-origin"
	});

	const authLink = setContext((_, { headers }) => {
		const token = localStorage.getItem("token");
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : ""
			}
		};
	});

	const wsLink = new WebSocketLink({
		uri:
			!process.env.NODE_ENV || process.env.NODE_ENV === "development"
				? "ws://localhost:8000/graphql"
				: "wss://kings-corner.games/graphql",
		options: {
			timeout: 30000,
			reconnect: true,
			connectionParams: () => {
				const token = localStorage.getItem("token");
				return {
					authorization: token ? `Bearer ${token}` : ""
				};
			}
		}
	});
	const errorLink = onError(({ graphQLErrors }) => {
		if (graphQLErrors) {
			if (
				graphQLErrors
					.map((error: any) => error.extensions.code)
					.includes("INTERNAL_SERVER_ERROR")
			) {
				providerRef.current.enqueueSnackbar("GraphQL Error - See Console");
				graphQLErrors.forEach((error) => {
					if (!error.message) console.error(`An Unknown Error Has Occurred`);
					console.error(`Error: ${error.message}. Operation: ${error.path}`);
				});
			} else if (
				graphQLErrors.map((error: any) => error.extensions.code).includes("UNAUTHENTICATED")
			) {
				window.location.href = "/login";
			}
		}
	});

	const splitLink = split(
		({ query }) => {
			const definition = getMainDefinition(query);
			return (
				definition.kind === "OperationDefinition" && definition.operation === "subscription"
			);
		},
		wsLink,
		authLink.concat(httpLink)
	);

	const additiveLink = from([errorLink, splitLink]);

	const client = new ApolloClient({
		link: additiveLink,
		cache: new InMemoryCache()
	});

	return (
		<SnackbarProvider maxSnack={3} preventDuplicate ref={providerRef}>
			<ApolloProvider client={client}>
				<Router />
			</ApolloProvider>
		</SnackbarProvider>
	);
};

const MobileApp = (props: any) => {
	return (
		<Box>
			<Typography>Go To Desktop To See App</Typography>
		</Box>
	);
};
export default App;
