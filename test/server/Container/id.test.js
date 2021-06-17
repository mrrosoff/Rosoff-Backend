import chai from "chai";

chai.should();

import id from "../../../server/Container/id";

describe("Container/id", () => {
	describe("id", () => {
		it("should be a function", () => {
			id.should.be.a("function");
		});
	});
});
