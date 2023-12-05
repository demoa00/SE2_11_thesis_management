"use strict";

const KeywordController = require("../controllers/KeywordController.js");
const { getKeywords } = require("../service/KeywordService.js");

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock("../service/KeywordService.js", () => ({
  getKeywords: jest.fn(),
}));

describe("getKeywords", () => {
  test("should return 200", async () => {
    const mockReq = {};
    const mockRes = {
      writeHead: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    };
    const mockNext = {};

    getKeywords.mockResolvedValue(["keyword1", "keyword2"]);

    await KeywordController.getKeywords(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify(["keyword1", "keyword2"], null, 2)
    );
  });
  test("should respond with 404 not found - no Keywords available", async () => {
    const mockReq = {};
    const mockRes = {
      writeHead: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    };
    const mockNext = {};

    getKeywords.mockRejectedValue({ code: 404, message: "Not Found" });

    await KeywordController.getKeywords(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(404, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify({ error: "Not Found" }, null, 2)
    );
  });
});
