import chai from "chai";

chai.should();

import newContainerLog from "../../../server/Subscription/newContainerLog";

describe("Subscription/newContainerLog", () => {
	describe("newContainerLog", () => {
		it("should be a object", () => {
			newContainerLog.should.be.an("object");
		});
		it("should be a resolve and subscribe properties", () => {
			newContainerLog.should.have.property("resolve");
			newContainerLog.should.have.property("subscribe");
		});
	});
});
