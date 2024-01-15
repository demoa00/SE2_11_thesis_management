"use strict";

const StudentController = require("../controllers/StudentController.js");
const { getStudentById } = require("../service/StudentService.js");

beforeEach(() => {
  jest.resetAllMocks();
});

jest.mock("../service/StudentService.js", () => ({
  getStudentById: jest.fn(),
}));

const mockRes = {
  writeHead: jest.fn().mockReturnThis(),
  end: jest.fn().mockReturnThis(),
};
const mockNext = {};

describe("getStudentById", () => {
  test("should respond with 200", async () => {
    const mockReq = {
      params: {
        studentId: "s123456",
      },
    };

    const student = {
      studentId: "s123456",
    };

    getStudentById.mockResolvedValue(student);

    await StudentController.getStudentById(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(JSON.stringify(student, null, 2));
  });
  test("should respond with 400 - Bad Request", async () => {
    const mockReq = {
      params: {},
    };

    await StudentController.getStudentById(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(400, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify({ error: "Bad Request" }, null, 2)
    );
  });
  test("should respond with 404 not found", async () => {
    const mockReq = {
      params: {
        studentId: "s123324",
      },
    };

    getStudentById.mockRejectedValue({ code: 404, message: "Not Found" });

    await StudentController.getStudentById(mockReq, mockRes, mockNext);

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
