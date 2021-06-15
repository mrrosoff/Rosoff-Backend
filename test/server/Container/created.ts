import chai from "chai";

chai.should();

import created from "../../../server/Container/created";

describe("Container/created", () => {
	describe("created", () => {
		it("should be a function", () => {
			created.should.be.a("function");
		});
	});
});
