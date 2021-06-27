import { Context } from "../index";
import { Container } from "./index";

interface Network {
	Gateway: string;
	IPAddress: string;
	MacAddress: string;
}

const networks = async (parent: Container, args: any, context: Context, info: any) => {
	return Object.entries(parent.NetworkSettings.Networks).map(([key, value]) => {
		const network = value as Network;
		return {
			name: key,
			gateway: network.Gateway,
			ipAddress: network.IPAddress,
			macAddress: network.MacAddress
		};
	});
};

export default networks;
