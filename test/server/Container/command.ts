import chai from "chai";

chai.should();

import command from "../../../server/Container/command";

describe("Container/command", () => {
	describe("command", () => {
		it("should be a function", () => {
			command.should.be.a("function");
		});
	});
});
