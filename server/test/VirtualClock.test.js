"use strict";

const VirtualClockController = require("../controllers/VirtualClockController.js");
const { updateVirtualClock } = require("../service/VirtualClockService.js");

beforeEach(() => {
  jest.resetAllMocks();
});

jest.mock("../service/VirtualClockService.js", () => ({
  updateVirtualClock: jest.fn(),
}));

const mockRes = {
  writeHead: jest.fn().mockReturnThis(),
  end: jest.fn().mockReturnThis(),
};
const mockNext = {};

describe("updateVirtualClock ", () => {
  test("should respond with 200", async () => {
    const mockReq = {
      body: {
        date: "",
      },
    };

    updateVirtualClock.mockResolvedValue();

    await VirtualClockController.updateVirtualClock(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify({ message: "OK" }, null, 2)
    );
  });
  test("should respond with 400 Bad Request", async () => {
    const mockReq = {
      body: {},
    };

    await VirtualClockController.updateVirtualClock(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(400, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify({ error: "Bad Request" }, null, 2)
    );
  });
});
