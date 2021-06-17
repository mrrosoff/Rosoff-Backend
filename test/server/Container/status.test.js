import chai from "chai";

chai.should();

import status from "../../../server/Container/status";

describe("Container/status", () => {
	describe("status", () => {
		it("should be a function", () => {
			status.should.be.a("function");
		});
	});
});
