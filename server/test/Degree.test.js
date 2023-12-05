"use strict";

const DegreeControler = require("../controllers/DegreeController.js");
const { getDegrees } = require("../service/DegreeService.js");

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock("../service/DegreeService.js", () => ({
  getDegrees: jest.fn(),
}));

describe("getDegrees", () => {
  test("should return 200", async () => {
    const mockReq = {};
    const mockRes = {
      writeHead: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    };
    const mockNext = {};

    getDegrees.mockResolvedValue(["degree1", "degree2"]);

    await DegreeControler.getDegrees(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify(["degree1", "degree2"], null, 2)
    );
  });
  test("should respond with 404 not found - no Degree available", async () => {
    const mockReq = {};
    const mockRes = {
      writeHead: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    };
    const mockNext = {};

    getDegrees.mockRejectedValue({ code: 404, message: "Not Found" });

    await DegreeControler.getDegrees(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(404, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify({ error: "Not Found" }, null, 2)
    );
  });
});
