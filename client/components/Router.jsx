import { BrowserRouter, Switch, Route, Redirect, useRouteMatch } from "react-router-dom";

import Home from "./Index/Home.jsx";

import LoginLayout from "./Login/Layout.jsx";
import Login from "./Login/Login.jsx";
import CreateAccount from "./Login/CreateAccount.jsx";
import ForgotPassword from "./Login/ForgotPassword.jsx";

import AppLayout from "./App/AppLayout.jsx";

import DashBoard from "./App/Pages/Dashboard.jsx";
import Matches from "./App/Pages/Matches.jsx";
import Match from "./App/Match/Match.jsx";
import BattlePass from "./App/Pages/BattlePass.jsx";
import Collection from "./App/Pages/Collection.jsx";
import Shop from "./App/Pages/Shop.jsx";

import Profile from "./App/Pages/Profile.jsx";
import NotFound from "./NotFound.jsx";
import FinalizeAccount from "./Login/FinalizeAccount.jsx";

import { useQuery } from "@apollo/client";
import { GetHeaderProfile } from "./../graphql/query.js";

const Router = (props) => {
	return (
		<BrowserRouter>
			<Routes />
		</BrowserRouter>
	);
};

const Routes = (props) => {
	return (
		<Switch>
			<Route exact path={"/"}>
				<Home />
			</Route>
			<Route path={"/login"}>
				<LoginLayout>
					<Login />
				</LoginLayout>
			</Route>
			<FilterRoutes path={"/finalize-account"}>
				<LoginLayout>
					<FinalizeAccount />
				</LoginLayout>
			</FilterRoutes>
			<FilterRoutes path={"/create-account"}>
				<LoginLayout>
					<CreateAccount />
				</LoginLayout>
			</FilterRoutes>
			<ForgotPasswordRoutes path={"/forgot-password"} />
			<ProtectedRoute path={"/app"}>
				<AppRoutes />
			</ProtectedRoute>
			<Route path={"*"}>
				<NotFound />
			</Route>
		</Switch>
	);
};

const ForgotPasswordRoutes = (props) => {
	const { path } = useRouteMatch();
	return (
		<Route path={props.path}>
			<Switch>
				<Route exact path={props.path}>
					<LoginLayout>
						<ForgotPassword {...props} />
					</LoginLayout>
				</Route>
				<Route path={`${props.path}/:authToken`}>
					<LoginLayout>
						<ForgotPassword {...props} />
					</LoginLayout>
				</Route>
			</Switch>
		</Route>
	);
};

const AppRoutes = (props) => {
	const { path } = useRouteMatch();
	return (
		<Switch>
			<Route exact path={path}>
				<Redirect to={{ pathname: `${path}/dashboard`, state: { from: props.location } }} />
			</Route>
			<FilterRoutes path={`${path}/profile`}>
				<AppLayout>
					<Profile />
				</AppLayout>
			</FilterRoutes>
			<FilterRoutes path={`${path}/match-history`}>
				<AppLayout>
					<Profile />
				</AppLayout>
			</FilterRoutes>
			<FilterRoutes path={`${path}/dashboard`}>
				<AppLayout>
					<DashBoard />
				</AppLayout>
			</FilterRoutes>
			<MatchRoutes path={`${path}/matches`} />
			<FilterRoutes path={`${path}/battle-pass`}>
				<AppLayout>
					<BattlePass />
				</AppLayout>
			</FilterRoutes>
			<FilterRoutes path={`${path}/collection`}>
				<AppLayout>
					<Collection />
				</AppLayout>
			</FilterRoutes>
			<FilterRoutes path={`${path}/shop`}>
				<AppLayout>
					<Shop />
				</AppLayout>
			</FilterRoutes>
			<Route path={"*"}>
				<NotFound />
			</Route>
		</Switch>
	);
};

const MatchRoutes = (props) => {
	return (
		<Route path={props.path}>
			<Switch>
				<Route exact path={props.path}>
					<AppLayout>
						<Matches {...props} />
					</AppLayout>
				</Route>
				<Route path={`${props.path}/:matchId`}>
					<AppLayout>
						<Match {...props} />
					</AppLayout>
				</Route>
			</Switch>
		</Route>
	);
};

const FilterRoutes = (props) => {
	return (
		<Route path={props.path}>
			<Switch>
				<Route exact path={props.path}>
					{props.children}
				</Route>
				<Route path={"*"}>
					<Redirect to={{ pathname: props.path, state: { from: props.location } }} />
				</Route>
			</Switch>
		</Route>
	);
};

const ProtectedRoute = (props) => {
	return (
		<Route {...props}>
			{localStorage.getItem("token") ? (
				props.children
			) : (
				<Redirect to={{ pathname: "/login", state: { from: props.location } }} />
			)}
		</Route>
	);
};

export default Router;
