import createdAt from "./createdAt";
import hardware from "./hardware";
import id from "./id";
import image from "./image";
import name from "./name";
import networks from "./networks";
import status from "./status";

export interface Container {
	Config: {
		Image: string;
	};
	Created: string;
	HostConfig: {
		CpusetCpus: string;
		CpusetMems: string;
		CpuPercent: number;
		CpuShares: number;
		CpuPeriod: number;
		Memory: number;
		MemorySwap: number;
		MemoryReservation: number;
		PortBindings: {};
		Privileged: boolean;
	};
	Id: string;
	Image: string;
	Name: string;
	NetworkSettings: {
		Networks: any;
	};
	State: {
		Status: string;
	};
}

export default {
	createdAt,
	hardware,
	id,
	image,
	name,
	networks,
	status
};
