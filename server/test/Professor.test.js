"use strict";

const ProfessorController = require("../controllers/ProfessorController.js");
const {
  getProfessors,
  getProfessorById,
} = require("../service/ProfessorService.js");

beforeEach(() => {
  jest.resetAllMocks();
});

jest.mock("../service/ProfessorService.js", () => ({
  getProfessors: jest.fn(),
  getProfessorById: jest.fn(),
}));

const mockRes = {
  writeHead: jest.fn().mockReturnThis(),
  end: jest.fn().mockReturnThis(),
};
const mockNext = {};

describe("getProfessors", () => {
  test("should respond with 200", async () => {
    const mockReq = {
      user: {},
      query: {},
    };

    const professorsList = [
      {
        professorId: "p987123",
        name: "Elizabeth",
        surname: "Lopez",
        self: "/api/professors/p987123",
      },
      {
        professorId: "p456789",
        name: "James",
        surname: "Rodriguez",
        self: "/api/professors/p456789",
      },
    ];

    getProfessors.mockResolvedValue(professorsList);

    await ProfessorController.getProfessors(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify(professorsList, null, 2)
    );
  });
  test("should respond with 404 Bad Request", async () => {
    const mockReq = {};

    await ProfessorController.getProfessors(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(404, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify({ error: "Bad Request" }, null, 2)
    );
  });
});

describe("getProfessorsById", () => {
  test("should respond with 200", async () => {
    const mockReq = {
      params: {
        professorId: "p987123",
      },
    };

    const professor = {
      professorId: "p123098",
      name: "Robert",
      surname: "Clark",
      email: "robert.clark@polito.it",
      codGroup: "CG_21",
      codDepartment: "CD_21",
      self: "/api/professors/p123098",
    };

    getProfessorById.mockResolvedValue(professor);

    await ProfessorController.getProfessorById(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify(professor, null, 2)
    );
  });
  test("should respond with 404", async () => {
    const mockReq = {
      params: {},
    };

    await ProfessorController.getProfessorById(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(404, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify({ error: "Bad Request" }, null, 2)
    );
  });
  test("should respond with 404 not found - missing professorId", async () => {
    const mockReq = {
      params: {
        professorId: "p987123",
      },
    };

    getProfessorById.mockRejectedValue({ code: 404, message: "Not Found" });

    await ProfessorController.getProfessorById(mockReq, mockRes, mockNext);

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
