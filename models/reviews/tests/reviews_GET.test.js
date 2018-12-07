const util = require('../../utility');
const Request = util.Request;
const Response = util.Response;
const isReview = util.isReview;

const reviews_GET = require('../reviews_GET');

test("generic reviews_GET", () => {
    let req = new Request();
    let res = reviews_GET(req);

    expect(res).toBeInstanceOf(Response);
    expect(res.status).toBe(200);
    expect(res.json).toBeDefined();
    expect(res.json.tot_reviews).toBeGreaterThanOrEqual(0);
    expect(res.json.reviews).toBeDefined();
    res.json.reviews.every(review => {
        expect(isReview(review)).toBe(true);
    });
});