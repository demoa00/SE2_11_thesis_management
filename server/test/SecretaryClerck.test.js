"use strict";

const SecretaryClerckController = require("../controllers/SecretaryClerckController.js");
const {
  getSecretaryClerckEmployeeById,
} = require("../service/SecretaryClerckService.js");

beforeEach(() => {
  jest.resetAllMocks();
});

jest.mock("../service/SecretaryClerckService.js", () => ({
  getSecretaryClerckEmployeeById: jest.fn(),
}));

const mockRes = {
  writeHead: jest.fn().mockReturnThis(),
  end: jest.fn().mockReturnThis(),
};
const mockNext = {};

describe("getSecretaryClerckEmployeeById", () => {
  test("should respond with 200", async () => {
    const mockReq = {
      params: {
        secretaryClerckEmployeeId: 1,
      },
    };

    const SecretaryClerckList = ["SecretaryClerck1", "SecretaryClerck2"];

    getSecretaryClerckEmployeeById.mockResolvedValue(SecretaryClerckList);

    await SecretaryClerckController.getSecretaryClerckEmployeeById(
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify(SecretaryClerckList, null, 2)
    );
  });
  test("should respond with 400 Bad Request", async () => {
    const mockReq = {
      params: {},
    };

    await SecretaryClerckController.getSecretaryClerckEmployeeById(
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockRes.writeHead).toHaveBeenCalledWith(400, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify({ error: "Bad Request" }, null, 2)
    );
  });
});
