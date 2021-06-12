import chai from "chai";

chai.should();

import containers from "../../../server/User/containers";

describe("User/containers", () => {
	describe("containers", () => {
		it("should be a function", () => {
			containers.should.be.a("function");
		});
	});
});
