import chai from "chai";

chai.should();

import names from "../../../server/Container/names";

describe("User/names", () => {
	describe("names", () => {
		it("should be a function", () => {
			names.should.be.a("function");
		});
	});
});
