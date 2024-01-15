"use strict";

const CareerController = require("../controllers/CareerController.js");
const { getCareer } = require("../service/CareerService.js");

beforeEach(() => {
  jest.resetAllMocks();
});

jest.mock("../service/CareerService.js", () => ({
  getCareer: jest.fn(),
}));

const mockRes = {
  writeHead: jest.fn().mockReturnThis(),
  end: jest.fn().mockReturnThis(),
};
const mockNext = {};

describe("getCareer ", () => {
  test("should respond with 200", async () => {
    const mockReq = {
      params: {
        studentId: "s123456",
      },
    };

    const career = ["career"];

    getCareer.mockResolvedValue(career);

    await CareerController.getCareer(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(JSON.stringify(career, null, 2));
  });
  test("should respond with 400 Bad Request", async () => {
    const mockReq = {
      params: {},
    };

    const career = ["career"];

    getCareer.mockResolvedValue(career);

    await CareerController.getCareer(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(400, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify({ error: "Bad Request" }, null, 2)
    );
  });
});
