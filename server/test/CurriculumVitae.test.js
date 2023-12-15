"use strict";

const CurriculumVitaeController = require("../controllers/CurriculumVitaeController.js");
const {
  getCV,
  insertNewCV,
  deleteCV,
} = require("../service/CurriculumVitaeService.js");

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock("../service/CurriculumVitaeService.js", () => ({
  getCV: jest.fn(),
  insertNewCV: jest.fn(),
  deleteCV: jest.fn(),
}));

describe("getCV ", () => {
  test("should respond with 200", async () => {
    const mockReq = {
      params: {
        studentId: "s123456",
      },
    };
    const mockRes = {
      writeHead: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    const mockNext = {};

    const CV = ["CV"];

    getCV.mockResolvedValue(CV);

    await CurriculumVitaeController.getCV(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(JSON.stringify(CV, null, 2));
  });
});

describe("insertNewCV ", () => {
  test("should respond with 200", async () => {
    const mockReq = {
      params: {
        studentId: "s123456",
      },
    };
    const mockRes = {
      writeHead: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
    };
    const mockNext = {};

    const CVresponse = {
      message: "OK",
      code: 200,
    };

    insertNewCV.mockResolvedValue(CVresponse);

    await CurriculumVitaeController.insertNewCV(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith("OK");
  });
});

describe("deleteCV ", () => {
  test("should respond with 200", async () => {
    const mockReq = {
      user: {
        userId: "s123456",
      },
      params: {
        studentId: "s123456",
      },
    };
    const mockRes = {
      writeHead: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
    };
    const mockNext = {};

    deleteCV.mockResolvedValue();

    await CurriculumVitaeController.deleteCV(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(204, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith("No Content");
  });
  test("should respond with 404 Bad Request", async () => {
    const mockReq = {
      user: {
        userId: "s123457",
      },
      params: {
        studentId: "s123456",
      },
    };
    const mockRes = {
      writeHead: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
    };
    const mockNext = {};

    deleteCV.mockResolvedValue();

    await CurriculumVitaeController.deleteCV(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(404, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify({ error: "Bad Request" }, null, 2)
    );
  });
});
