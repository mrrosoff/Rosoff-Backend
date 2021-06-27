import chai from "chai";

chai.should();

import image from "../../../server/Container/Image/name";

describe("User/image", () => {
	describe("image", () => {
		it("should be a function", () => {
			image.should.be.a("function");
		});
	});
});
