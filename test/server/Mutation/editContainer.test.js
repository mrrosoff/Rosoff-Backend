import chai from "chai";

chai.should();

import editContainer from "../../../server/Mutation/editContainer";

describe("Mutation/editContainer", () => {
	describe("editContainer", () => {
		it("should be a function", () => {
			editContainer.should.be.a("function");
		});
	});
});
