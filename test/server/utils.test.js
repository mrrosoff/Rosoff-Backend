import chai from "chai";

chai.should();

import { checkIsLoggedIn, checkIsMe, checkIsContainerOwner } from "../../server/utils.js";

describe("utils.js", () => {
	describe("checkIsLoggedIn", () => {
		it("should be an object", () => {
			checkIsLoggedIn.should.be.a("function");
		});
	});
	describe("checkIsMe", () => {
		it("should be an object", () => {
			checkIsMe.should.be.a("function");
		});
	});
	describe("checkIsContainerOwner", () => {
		it("should be an object", () => {
			checkIsContainerOwner.should.be.a("function");
		});
	});
});
