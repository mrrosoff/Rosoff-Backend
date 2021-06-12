import chai from "chai";

chai.should();

import mocks from "../../server/mocking";

describe("mocking", () => {
	describe("mocks", () => {
		it("should be a object", () => {
			mocks.should.be.an("object");
		});
		it("should have User and Match properties", () => {
			mocks.should.have.property("User");
			mocks.should.have.property("Container");
		});
	});
});
