"use strict";

const ThesisRequestController = require("../controllers/ThesisRequestController.js");
const {
  getThesisRequestsForProfessor,
  getThesisRequestsForSecretary,
  getThesisRequestById,
  insertNewThesisRequest,
  updateThesisRequest,
} = require("../service/ThesisRequestService.js");
const { isProfessor, isSecretaryClerck } = require("../utils/checkRole.js");

beforeEach(() => {
  jest.resetAllMocks();
});

jest.mock("../service/ThesisRequestService.js", () => ({
  getThesisRequestsForProfessor: jest.fn(),
  getThesisRequestsForSecretary: jest.fn(),
  getThesisRequestById: jest.fn(),
  insertNewThesisRequest: jest.fn(),
  updateThesisRequest: jest.fn(),
}));

jest.mock("../utils/checkRole.js", () => ({
  isSecretaryClerck: jest.fn(),
  isProfessor: jest.fn(),
}));

const mockRes = {
  writeHead: jest.fn().mockReturnThis(),
  end: jest.fn().mockReturnThis(),
};
const mockNext = {};

describe("getThesisRequest ", () => {
  test("should respond with 200 - as Secretary Clerk", async () => {
    const mockReq = {
      user: {
        userId: "s123654",
      },
    };

    const thesisRequestsForSecretary = ["thesisRequest1", "thesisRequest2"];

    isProfessor.mockResolvedValue();

    getThesisRequestsForProfessor.mockResolvedValue(thesisRequestsForSecretary);

    await ThesisRequestController.getThesisRequests(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify(thesisRequestsForSecretary, null, 2)
    );
  });
  test("should respond with 200 - as professor", async () => {
    const mockReq = {
      user: {
        userId: "p123654",
      },
    };

    const thesisRequestsForProfessor = ["thesisRequest1", "thesisRequest2"];

    isProfessor.mockResolvedValue();

    getThesisRequestsForProfessor.mockResolvedValue(thesisRequestsForProfessor);

    await ThesisRequestController.getThesisRequests(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify(thesisRequestsForProfessor, null, 2)
    );
  });
  test("should respond with 403 Forbidden", async () => {
    const mockReq = {
      user: {
        studentId: "s123456",
      },
    };

    await ThesisRequestController.getThesisRequests(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(403, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify({ error: "Forbidden" }, null, 2)
    );
  });
});

describe("getThesisRequestById ", () => {
  test("should respond with 200", async () => {
    const mockReq = {
      user: {},
      params: {
        thesisRequestId: "123",
      },
    };

    const thesisRequest = ["thesisRequest"];

    getThesisRequestById.mockResolvedValue(thesisRequest);

    await ThesisRequestController.getThesisRequestById(
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify(thesisRequest, null, 2)
    );
  });
  test("should respond with 404 Bad Request", async () => {
    const mockReq = {
      user: {},
      params: {},
    };

    await ThesisRequestController.getThesisRequestById(
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockRes.writeHead).toHaveBeenCalledWith(404, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify({ error: "Bad Request" }, null, 2)
    );
  });
});

describe("insertNewThesisRequest", () => {
  test("should respond with 200", async () => {
    const mockReq = {
      user: {
        userId: "s123654",
      },
      body: {},
    };

    const newThesisRequest = ["newThesisRequest"];

    insertNewThesisRequest.mockResolvedValue(newThesisRequest);

    await ThesisRequestController.insertNewThesisRequest(
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify(newThesisRequest, null, 2)
    );
  });
  test("should respond with 404 Bad Request", async () => {
    const mockReq = {
      user: {},
      body: {},
    };

    await ThesisRequestController.insertNewThesisRequest(
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockRes.writeHead).toHaveBeenCalledWith(404, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify({ error: "Bad Request" }, null, 2)
    );
  });
});

describe("updateThesisRequest", () => {
  test("should respond with 200", async () => {
    const mockReq = {
      user: {
        userId: "s123654",
      },
      body: {},
      params: {
        thesisRequestId: "123",
      },
    };

    const thesisRequestUpdated = ["thesisRequestUpdated"];

    updateThesisRequest.mockResolvedValue(thesisRequestUpdated);

    await ThesisRequestController.updateThesisRequest(
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify(thesisRequestUpdated, null, 2)
    );
  });
  test("should respond with 404 Bad Request", async () => {
    const mockReq = {
      user: {
        userId: "s123654",
      },
      body: {},
      params: {},
    };

    await ThesisRequestController.updateThesisRequest(
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockRes.writeHead).toHaveBeenCalledWith(404, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify({ error: "Bad Request" }, null, 2)
    );
  });
});
