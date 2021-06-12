import chai from "chai";

chai.should();

import selfLookup from "../../../server/Query/selfLookup";

describe("Query/selfLookup", () => {
	describe("selfLookup", () => {
		it("should be a function", () => {
			selfLookup.should.be.a("function");
		});
	});
});
