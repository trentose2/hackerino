const util = require('../../utility');
const Request = util.Request;
const teachers_teacherID_PUT = require('../teachers_teacherID_PUT');

const resetDB = require('../../sampleDB').resetDB;

beforeEach(resetDB);

describe("teachers/teacherID PUT", () => {
	test("creating", () => {
		let request = new Request();
		request.params = { teacherID: "99" };
		request.body = {
			email: "fabio.casati2@unitn.it",
			first_name: "f",
			last_name: "b"
		};
		let response = teachers_teacherID_PUT(request);
		expect(response.status).toBe(201);
	});

	test("updating with good params", () => {
		let request = new Request();
		request.params = { teacherID: "1" };
		request.body = {
			email: "fabio.casati@unitn.it",
			first_name: "asd",
			last_name: "mk"
		};
		let response = teachers_teacherID_PUT(request);
		expect(response.status).toBe(200);
	});

	test("updating with bad params", () => {
		let request = new Request();
		request.params = { teacherID: "1" };
		request.body = {
			email: "fabio.casati@unitn.it",
			first_name: 1,
			last_name: "mk"
		};
		let response = teachers_teacherID_PUT(request);
		expect(response.status).toBe(400);
	});

	test("updating with bad params", () => {
		let request = new Request();
		request.params = { teacherID: "1" };
		request.body = {
			email: "fabio.casati@unitn.it",
			first_name: "asd",
			last_name: null
		};
		let response = teachers_teacherID_PUT(request);
		expect(response.status).toBe(400);
	});

	test("creating with existing email", () => {
		let request = new Request();
		request.params = { teacherID: "99" };
		request.body = {
			email: "fabio.casati@unitn.it",
			first_name: "undefined",
			last_name: "null"
		};
		let response = teachers_teacherID_PUT(request);
		expect(response.status).toBe(423);
	});

	test("creating with bad params", () => {
		let request = new Request();
		request.params = { teacherID: "99" };
		request.body = {
			email: "fabio.casati@unitn.it",
			first_name: "asd",
			last_name: null
		};
		let response = teachers_teacherID_PUT(request);
		expect(response.status).toBe(400);
	});

	test("creating with bad params", () => {
		let request = new Request();
		request.params = { teacherID: "99" };
		request.body = {
			email: "fabio.casati@unitn.it",
			first_name: "asd",
			last_name: null
		};
		let response = teachers_teacherID_PUT(request);
		expect(response.status).toBe(400);
	});

	test("creating with bad params", () => {
		let request = new Request();
		request.params = { teacherID: "99" };
		request.body = {
			email: "",
			first_name: "asd",
			last_name: "be"
		};
		let response = teachers_teacherID_PUT(request);
		expect(response.status).toBe(400);
	});

	test("creating with bad params", () => {
		let request = new Request();
		request.params = { teacherID: "9.2" };
		request.body = {
			email: "f.c@u.it",
			first_name: "asd",
			last_name: "be"
		};
		let response = teachers_teacherID_PUT(request);
		expect(response.status).toBe(400);
	});

	test("put-update with wrong email", () => {
		let request = new Request();
		request.params = { teacherID: "1" };
		request.body = {
			email: "fabio.casaaaaaaati@unitn.it",
			first_name: "asd",
			last_name: "be"
		};
		response = teachers_teacherID_PUT(request);
		expect(response.status).toBe(400);
	});
});
