import chai from "chai";

chai.should();

import { client } from "../../server/db";

describe("db", () => {
	describe("client", () => {
		it("should be a object", () => {
			client.should.be.an("object");
		});
	});
});
