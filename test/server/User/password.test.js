import chai from "chai";

chai.should();

import password from "../../../server/User/password";

describe("User/password", () => {
	describe("password", () => {
		it("should be a function", () => {
			password.should.be.a("function");
		});
	});
});
