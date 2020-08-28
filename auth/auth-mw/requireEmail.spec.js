const requireEmail = require("./requireEmail");
const httpMock = require("node-mocks-http");

describe("testing requireEmail()", () => {
  it("returns error message if email is not in body", () => {
    const mockReq = httpMock.createRequest({
      body: {email: ""},
    });

    const mockRes = httpMock.createResponse();
    const mockNext = jest.fn(() => true);

    // run the function under test
    const response = requireEmail(mockReq, mockRes, mockNext);

    // Pull the data out of response
    const data = response._getJSONData();

    expect(response.statusCode).toBe(400);
    expect(data.message).toBe("Missing required email field");
  });

  it("returns next() if the email is present", () => {
    const mockReq = httpMock.createRequest({
      body: {email: "email@email.com"},
    });

    const mockRes = httpMock.createResponse();
    const mockNext = jest.fn(() => true);

    const response = requireEmail(mockReq, mockRes, mockNext);

    expect(mockNext).toBeCalled();
  });
});
