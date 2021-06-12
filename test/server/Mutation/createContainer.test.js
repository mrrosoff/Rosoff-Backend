import chai from "chai";

chai.should();

import createContainer from "../../../server/Mutation/createContainer";

describe("Mutation/createContainer", () => {
	describe("createContainer", () => {
		it("should be a function", () => {
			createContainer.should.be.a("function");
		});
	});
});
