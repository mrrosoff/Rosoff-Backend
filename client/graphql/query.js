import { gql } from "@apollo/client";

export const GetInfoFromSearch = gql`
	query GetInfoFromSearch($query: String!) {
		selfLookup {
			username
			containers {
				id
				name
			}
		}
	}
`;

export const GetHeaderProfile = gql`
	query GetHeaderProfile {
		selfLookup {
			username
			avatar
		}
	}
`;

export const GetTraditionalProfile = gql`
	query GetTraditionalProfile {
		selfLookup {
			username
			avatar
		}
	}
`;

export const GetContainersOverview = gql`
	query GetContainersOverview {
		selfLookup {
			username
			containers {
				id
				name
				status
			}
		}
	}
`;

export const GetContainerData = gql`
	query GetContainerData($id: ID!) {
		selfLookup {
			username
			avatar
		}
		containerLookup(id: $id) {
			id
			name
		}
	}
`;
