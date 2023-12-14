"use strict";

const VirtualClockController = require("../controllers/VirtualClockController.js");
const { updateVirtualClock } = require("../service/VirtualClockService.js");

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock("../service/VirtualClockService.js", () => ({
  updateVirtualClock: jest.fn(),
}));

describe("updateVirtualClock ", () => {
  test("should respond with 200", async () => {
    const mockReq = {
      body: {
        date: "",
      },
    };
    const mockRes = {
      writeHead: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    };
    const mockNext = {};

    updateVirtualClock.mockResolvedValue();

    await VirtualClockController.updateVirtualClock(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith("OK");
  });
});
