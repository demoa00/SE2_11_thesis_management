"use strict";

const ApplicationController = require("../controllers/ApplicationController.js");
const {
  getAllApplicationsForStudent,
  getApplicationsForProfessor,
  getApplicationById,
  insertNewApplication,
  updateApplication,
} = require("../service/ApplicationService.js");
const checkRole = require("../utils/checkRole.js");

beforeEach(() => {
  jest.resetAllMocks();
});

jest.mock("../service/ApplicationService.js", () => ({
  getAllApplicationsForStudent: jest.fn(),
  getApplicationsForProfessor: jest.fn(),
  getApplicationById: jest.fn(),
  insertNewApplication: jest.fn(),
  updateApplication: jest.fn(),
}));

jest.mock("../utils/checkRole.js", () => ({
  isStudent: jest.fn(),
  isProfessor: jest.fn(),
}));

const mockRes = {
  writeHead: jest.fn().mockReturnThis(),
  end: jest.fn().mockReturnThis(),
};
const mockNext = {};

describe("getApplications", () => {
  test("should return 200 - accessing as a student", async () => {
    const mockReq = {
      params: {
        studentId: "s876543",
      },
      user: {
        userId: "s876543",
      },
      query: {},
    };

    const ApplicationsListForStudent = ["application1", "application2"];

    checkRole.isStudent.mockResolvedValue("student");

    getAllApplicationsForStudent.mockResolvedValue(ApplicationsListForStudent);

    await ApplicationController.getApplications(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify(ApplicationsListForStudent, null, 2)
    );
  });
  test("should return 200 - accessing as a professor", async () => {
    const mockReq = {
      params: {
        professorId: "p123654",
      },
      user: {
        userId: "p123654",
      },
      query: {},
    };

    const ApplicationsListForProfessor = ["application1", "application2"];

    checkRole.isProfessor.mockResolvedValue("professor");

    getApplicationsForProfessor.mockResolvedValue(ApplicationsListForProfessor);

    await ApplicationController.getApplications(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify(ApplicationsListForProfessor, null, 2)
    );
  });
  test("should respond with 404 not found - no Applications available", async () => {
    const mockReq = {
      params: {
        studentId: "s876543",
      },
      user: {
        userId: "s876543",
      },
      query: {},
    };

    checkRole.isStudent.mockResolvedValue("student");

    getAllApplicationsForStudent.mockRejectedValue({
      code: 404,
      message: "Not Found",
    });

    await ApplicationController.getApplications(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(404, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify({ error: "Not Found" }, null, 2)
    );
  });
  test("should respond with 400 Bad Request", async () => {
    const mockReq = {
      user: {},
    };

    await ApplicationController.getApplications(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(400, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify({ error: "Bad Request" }, null, 2)
    );
  });
});

describe("getApplicationById", () => {
  test("should return 200", async () => {
    const mockReq = {
      params: {
        studentId: "s876543",
        thesisProposalId: "a123456",
      },
      user: {
        studentId: "s876543",
      },
    };

    const Application = [
      {
        applicationId: "a123456",
      },
    ];

    getApplicationById.mockResolvedValue(Application);

    await ApplicationController.getApplicationById(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify(Application, null, 2)
    );
  });
  test("should respond with 404 not found - no Application available", async () => {
    const mockReq = {
      params: {
        studentId: "s876543",
        thesisProposalId: "a123456",
      },
      user: {
        studentId: "s876543",
      },
    };
    const mockRes = {
      writeHead: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    };
    const mockNext = {};

    getApplicationById.mockRejectedValue({
      code: 404,
      message: "Not Found",
    });

    await ApplicationController.getApplicationById(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(404, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify({ error: "Not Found" }, null, 2)
    );
  });
  test("should return 400 Bad Request", async () => {
    const mockReq = {
      params: {
        studentId: "s876543",
      },
      user: {
        studentId: "s876543",
      },
    };

    await ApplicationController.getApplicationById(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(400, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify({ error: "Bad Request" }, null, 2)
    );
  });
});

describe("insertNewApplication", () => {
  test("should respond with 201", async () => {
    const mockReq = {
      params: {
        studentId: "s876543",
        thesisProposalId: "t123456",
      },
      user: {
        userId: "s876543",
      },
      body: {
        thesisProposalId: "t123456",
      },
    };

    const newApplication = {
      newApplication: "/api/Application/24",
    };

    insertNewApplication.mockResolvedValue(newApplication);

    await ApplicationController.insertNewApplication(
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockRes.writeHead).toHaveBeenCalledWith(201, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify(newApplication, null, 2)
    );
  });
  test("should respond with 400 Bad Request", async () => {
    const mockReq = {
      params: {
        studentId: "s876543",
        thesisProposalId: "t123456",
      },
      user: {
        studentId: "s876543",
      },
      body: {
        thesisProposalId: "t123457",
      },
    };

    const newApplication = {
      newApplication: "/api/Application/24",
    };

    insertNewApplication.mockResolvedValue(newApplication);

    await ApplicationController.insertNewApplication(
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

describe("updateNewApplication", () => {
  test("should respond with 200", async () => {
    const mockReq = {
      params: {
        studentId: "s876543",
        thesisProposalId: "t123456",
      },
      user: {
        userId: "s876543",
      },
      body: {
        thesisProposalId: "t123456",
      },
    };
    const mockRes = {
      writeHead: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    };
    const mockNext = {};

    const newApplication = {
      newApplication: "/api/Application/24",
    };

    updateApplication.mockResolvedValue(newApplication);

    await ApplicationController.updateApplication(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify(newApplication, null, 2)
    );
  });
  test("should respond with 400 Bad Request", async () => {
    const mockReq = {
      params: {
        studentId: "s876543",
        thesisProposalId: "t123456",
      },
      user: {
        studentId: "s876543",
      },
      body: {},
    };

    await ApplicationController.updateApplication(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(400, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify({ error: "Bad Request" }, null, 2)
    );
  });
});
