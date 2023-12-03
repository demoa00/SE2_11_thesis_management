"use strict";

const ExternalCoSupervisorController = require("../controllers/ExternalCoSupervisorController.js");
const {
  getExternalCoSupervisors,
  getExternalCoSupervisorById,
} = require("../service/ExternalCoSupervisorService.js");

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock("../service/ExternalCoSupervisorService.js", () => ({
  getExternalCoSupervisors: jest.fn(),
  getExternalCoSupervisorById: jest.fn(),
}));

describe("getExternalCoSupervisors", () => {
  test("should respond with 200", async () => {
    const mockReq = {
      user: {},
    };
    const mockRes = {
      writeHead: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    };
    const mockNext = {};

    const ExternalCoSupervisorList = [
      "ExternalCoSupervisor1",
      "ExternalCoSupervisor2",
    ];

    getExternalCoSupervisors.mockResolvedValue(ExternalCoSupervisorList);

    await ExternalCoSupervisorController.getExternalCoSupervisors(
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify(ExternalCoSupervisorList, null, 2)
    );
  });
});

describe("getExternalCoSupervisorById", () => {
  test("should respond with 200", async () => {
    const mockReq = {
      params: {
        ExternalCoSupervisorId: "ExternalCoSupervisor1",
      },
    };
    const mockRes = {
      writeHead: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    };
    const mockNext = {};

    const externalCoSupervisor = {
      externalCoSupervisorId: "ExternalCoSupervisor1",
    };

    getExternalCoSupervisorById.mockResolvedValue(externalCoSupervisor);

    await ExternalCoSupervisorController.getExternalCoSupervisorById(
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify(externalCoSupervisor, null, 2)
    );
  });
  test("should respond with 404 not found", async () => {
    const mockReq = {
      params: {},
    };
    const mockRes = {
      writeHead: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    };
    const mockNext = {};

    getExternalCoSupervisorById.mockRejectedValue({
      code: 404,
      message: "Not Found",
    });

    await ExternalCoSupervisorController.getExternalCoSupervisorById(
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockRes.writeHead).toHaveBeenCalledWith(404, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify(
        {
          error: "Not Found",
        },
        null,
        2
      )
    );
  });
});
