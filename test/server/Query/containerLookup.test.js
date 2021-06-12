import chai from "chai";

chai.should();

import containerLookup from "../../../server/Query/containerLookup";

describe("Query/containerLookup", () => {
	describe("containerLookup", () => {
		it("should be a function", () => {
			containerLookup.should.be.a("function");
		});
	});
});
