import chai from "chai";

chai.should();

import {
	checkIsLoggedIn,
	checkIsMatchOwner,
	checkIsMe,
	checkInMyFriends,
	checkInTheirFriends
} from "../../server/utils.js";

describe("utils.js", () => {
	describe("checkIsLoggedIn", () => {
		it("should be an object", () => {
			checkIsLoggedIn.should.be.a("function");
		});
	});
	describe("checkIsMatchOwner", () => {
		it("should be an object", () => {
			checkIsMatchOwner.should.be.a("function");
		});
	});
	describe("checkIsMe", () => {
		it("should be an object", () => {
			checkIsMe.should.be.a("function");
		});
	});
	describe("checkInMyFriends", () => {
		it("should be an object", () => {
			checkInMyFriends.should.be.a("function");
		});
	});
	describe("checkInTheirFriends", () => {
		it("should be an object", () => {
			checkInTheirFriends.should.be.a("function");
		});
	});
});
