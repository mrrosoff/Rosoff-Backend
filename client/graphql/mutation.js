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
	mutation SendResetPasswordEmail($email: String,  $username: String){
		sendResetPasswordEmail(email: $email, username: $username)
	}
`;

export const RequestFriend = gql`
	mutation RequestFriend($friendUsername: String!) {
		requestFriend(friendUsername: $friendUsername) {
			outgoingFriendRequests {
				username
				avatar
			}
		}
	}
`;

export const ResolveRequestFriend = gql`
	mutation ResolveRequestFriend($friendUsername: String!, $choice: Boolean!) {
		resolveRequestFriend(friendUsername: $friendUsername, choice: $choice) {
			incomingFriendRequests {
				username
				avatar
			}
		}
	}
`;

export const CreateMatch = gql`
	mutation CreateMatch {
		createMatch {
			_id
		}
	}
`;

export const EditMatch = gql`
	mutation EditMatch(
		$containerId: ID!
		$gameType: GAME_TYPE
		$name: String
		$boardSkin: ID
		$pieceSkin: ID
	) {
		editMatch(
			containerId: $containerId
			gameType: $gameType
			name: $name
			boardSkin: $boardSkin
			pieceSkin: $pieceSkin
		) {
			_id
			gameType
			name
			boardSkin {
				_id
				name
			}
			pieceSkin {
				_id
				name
			}
		}
	}
`;

export const InviteFriend = gql`
	mutation InviteFriend($containerId: ID!, $friendUsername: String!) {
		inviteFriend(containerId: $containerId, friendUsername: $friendUsername) {
			_id
			pendingPlayers {
				username
				avatar
			}
		}
	}
`;

export const ResolveInviteFriend = gql`
	mutation ResolveInviteFriend($containerId: ID!, $choice: Boolean!) {
		resolveInviteFriend(containerId: $containerId, choice: $choice) {
			_id
			pendingPlayers {
				username
				avatar
			}
			players {
				username
				avatar
			}
		}
	}
`;

export const DeleteUserFromMatch = gql`
	mutation DeleteUserFromMatch($containerId: ID!, $friendUsername: String) {
		deleteUserFromMatch(containerId: $containerId, friendUsername: $friendUsername) {
			_id
			players {
				username
				avatar
			}
		}
	}
`;

export const DeleteMatch = gql`
	mutation DeleteMatch($containerId: ID!) {
		deleteMatch(containerId: $containerId)
	}
`;

export const StartMatch = gql`
	mutation StartMatch($containerId: ID!) {
		startMatch(containerId: $containerId) {
			_id
			inProgress
		}
	}
`;

export const MakeMove = gql`
	mutation MakeMove($containerId: ID!, $updatedFen: Fen!) {
		makeMove(containerId: $containerId, updatedFen: $updatedFen) {
			_id
			... on MatchTwoPlayer {
				fen
				fenHistory
			}
		}
	}
`;

export const ResolveMatch = gql`
	mutation ResolveMatch($containerId: ID!, $finalFen: Fen!) {
		resolveMatch(containerId: $containerId, finalFen: $finalFen) {
			_id
			matchResults {
				winner {
					username
				}
				winnerNewRating
			}
			... on MatchTwoPlayer {
				fen
				fenHistory
			}
		}
	}
`;

export const SendMessage = gql`
	mutation SendMessage($friendUsername: String!, $message: String!) {
		sendMessage(friendUsername: $friendUsername, message: $message) {
			_id
			date
			message
			to {
				username
				avatar
			}
		}
	}
`;

export const BuyItem = gql`
	mutation BuyItem($itemId: ID!){
		buyItem(itemId: $itemId){
			username
			money
			items{
				type
				name
				description
				thumbnail
			}
			battlePass{
				_id
			}
		}
	}
`;
