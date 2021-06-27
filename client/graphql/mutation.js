import { gql } from "@apollo/client";

export const CreateUser = gql`
	mutation CreateUser($email: String!, $password: String!, $username: String!) {
		createUser(email: $email, password: $password, username: $username)
	}
`;

export const Login = gql`
	mutation Login($email: String, $username: String, $password: String!) {
		loginUser(email: $email, username: $username, password: $password)
	}
`;

export const GoogleLogin = gql`
	mutation GoogleLogin($token: ID!) {
		googleLogin(token: $token) {
			token
			redirectPath
		}
	}
`;

export const EditUser = gql`
	mutation EditUser(
		$name: String
		$username: String
		$avatar: String
		$email: String
		$password: String
	) {
		editUser(
			name: $name
			username: $username
			avatar: $avatar
			email: $email
			password: $password
		) {
			name
			username
			avatar
			email
			password
		}
	}
`;

export const SendResetPasswordEmail = gql`
	mutation SendResetPasswordEmail($email: String, $username: String) {
		sendResetPasswordEmail(email: $email, username: $username)
	}
`;

export const CreateContainer = gql`
	mutation CreateContainer {
		createContainer {
			id
		}
	}
`;

export const EditContainer = gql`
	mutation EditContainer($id: ID!, $name: String) {
		editContainer(id: $id, name: $name) {
			id
			name
		}
	}
`;

export const DeleteContainer = gql`
	mutation DeleteContainer($id: ID!) {
		deleteContainer(id: $id)
	}
`;
