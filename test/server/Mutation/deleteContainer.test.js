import chai from "chai";

chai.should();

import deleteContainer from "../../../server/Mutation/deleteContainer";

describe("Mutation/deleteContainer", () => {
	describe("deleteContainer", () => {
		it("should be a function", () => {
			deleteContainer.should.be.a("function");
		});
	});
});
