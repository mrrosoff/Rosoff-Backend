import React from "react";

import { BrowserRouter, Switch, Route, Redirect, useRouteMatch } from "react-router-dom";

import Home from "./Index/Home";

import LoginLayout from "./Login/Layout";
import Login from "./Login/Login";
import CreateAccount from "./Login/CreateAccount";
import ForgotPassword from "./Login/ForgotPassword";

import AppLayout from "./App/AppLayout";

import DashBoard from "./App/Pages/Dashboard";
import Containers from "./App/Pages/Containers";
import Container from "./App/Container/Container";

import Profile from "./App/Pages/Profile";
import NotFound from "./NotFound";
import FinalizeAccount from "./Login/FinalizeAccount";

const Router = (props: any) => {
	return (
		<BrowserRouter>
			<Routes />
		</BrowserRouter>
	);
};

const Routes = (props: any) => {
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

const ForgotPasswordRoutes = (props: any) => {
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

const AppRoutes = (props: any) => {
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
			<FilterRoutes path={`${path}/dashboard`}>
				<AppLayout>
					<DashBoard />
				</AppLayout>
			</FilterRoutes>
			<ContainerRoutes path={`${path}/containers`} />
			<Route path={"*"}>
				<NotFound />
			</Route>
		</Switch>
	);
};

const ContainerRoutes = (props: any) => {
	return (
		<Route path={props.path}>
			<Switch>
				<Route exact path={props.path}>
					<AppLayout>
						<Containers {...props} />
					</AppLayout>
				</Route>
				<Route path={`${props.path}/:containerId`}>
					<AppLayout>
						<Container {...props} />
					</AppLayout>
				</Route>
			</Switch>
		</Route>
	);
};

const FilterRoutes = (props: any) => {
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

const ProtectedRoute = (props: any) => {
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
