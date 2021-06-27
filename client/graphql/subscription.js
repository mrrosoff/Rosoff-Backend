import { gql } from "@apollo/client";

export const NewContainerLog = gql`
	subscription NewContainerLog($id: ID!) {
		newContainerLog(id: $id)
	}
`;
