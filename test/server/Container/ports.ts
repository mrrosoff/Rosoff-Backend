import chai from "chai";

chai.should();

import ports from "../../../server/Container/ports";

describe("Container/ports", () => {
	describe("ports", () => {
		it("should be a function", () => {
			ports.should.be.a("function");
		});
	});
});
