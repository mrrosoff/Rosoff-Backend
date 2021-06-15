import chai from "chai";

chai.should();

import mounts from "../../../server/Container/mounts";

describe("Container/mounts", () => {
	describe("mounts", () => {
		it("should be a function", () => {
			mounts.should.be.a("function");
		});
	});
});
