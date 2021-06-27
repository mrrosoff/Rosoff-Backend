import { Context } from "../index";
import { Container } from "./index";

const hardware = async (parent: Container, args: any, context: Context, info: any) => {
	return {
		cpusetCpus: parent.HostConfig.CpusetCpus,
		cpusetMems: parent.HostConfig.CpusetMems,
		cpuPercent: parent.HostConfig.CpuPercent,
		cpuShares: parent.HostConfig.CpuShares,
		cpuPeriod: parent.HostConfig.CpuPeriod,
		memory: parent.HostConfig.Memory,
		memorySwap: parent.HostConfig.MemorySwap,
		memoryReservation: parent.HostConfig.MemoryReservation,
		portBindings: {},
		privileged: parent.HostConfig.Privileged
	};
};

export default hardware;
