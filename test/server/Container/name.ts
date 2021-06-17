import chai from "chai";

chai.should();

import name from "../../../server/Container/name";

describe("User/name", () => {
	describe("names", () => {
		it("should be a function", () => {
			name.should.be.a("function");
		});
	});
});
