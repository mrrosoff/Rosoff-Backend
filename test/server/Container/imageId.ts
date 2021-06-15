import chai from "chai";

chai.should();

import imageId from "../../../server/Container/imageId";

describe("Container/imageId", () => {
	describe("imageId", () => {
		it("should be a function", () => {
			imageId.should.be.a("function");
		});
	});
});
