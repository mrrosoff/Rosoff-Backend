import { gql } from "@apollo/client";

export const NewFriendRequest = gql`
	subscription NewFriendRequest {
		newFriendRequest
	}
`;

export const NewFriend = gql`
	subscription NewFriend {
		newFriend
	}
`;

export const NewMatchInvite = gql`
	subscription NewMatchInvite {
		newMatchInvite
	}
`;

export const NewMatchPlayer = gql`
	subscription NewMatchPlayer($containerId: ID!) {
		newMatchPlayer(containerId: $containerId)
	}
`;

export const DeletedMatchPlayer = gql`
	subscription DeletedMatchPlayer($containerId: ID!) {
		deletedMatchPlayer(containerId: $containerId)
	}
`;

export const DeletedMatch = gql`
	subscription DeletedMatch($containerId: ID!) {
		deletedMatch(containerId: $containerId)
	}
`;

export const NewMatchInProgress = gql`
	subscription NewMatchInProgress($containerId: ID!) {
		newMatchInProgress(containerId: $containerId)
	}
`;

export const NewMatchMove = gql`
	subscription NewMatchMove($containerId: ID!) {
		newMatchMove(containerId: $containerId)
	}
`;

export const NewMessage = gql`
	subscription NewMessage {
		newMessage {
			_id
			date
			message
			from
		}
	}
`;
