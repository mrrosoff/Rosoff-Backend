import chai from "chai";

chai.should();

import {
	checkIsLoggedIn,
	checkIsMe,
	checkIsContainerOwner,
	removeNullArgs
} from "../../server/utils";

describe("utils", () => {
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
	describe("removeNullArgs", () => {
		it("should be a function", () => {
			removeNullArgs.should.be.a("function");
		});
		it("should do nothing to regular object", () => {
			const testObject = { foo: "bar", hello: "world" };
			removeNullArgs(testObject).should.deep.equal(testObject);
		});
		it("should remove keys with null values", () => {
			const testObject = { foo: "bar", hello: null };
			removeNullArgs(testObject).should.deep.equal({ foo: "bar" });
		});
	});
});
