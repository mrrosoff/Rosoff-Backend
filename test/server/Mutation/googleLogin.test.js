import chai from "chai";

chai.should();

import googleLogin from "../../../server/Mutation/googleLogin";

describe("Mutation/googleLogin", () => {
	describe("googleLogin", () => {
		it("should be a function", () => {
			googleLogin.should.be.a("function");
		});
	});
});
