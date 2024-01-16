"use strict";

const ThesisRequestController = require("../controllers/ThesisRequestController.js");
const {
  getThesisRequestsForProfessor,
  getThesisRequestsForSecretary,
  getThesisRequestsForStudent,
  getThesisRequestById,
  insertNewThesisRequest,
  updateThesisRequestForSecretary,
  updateThesisRequestForProfessor,
  updateThesisRequestForStudent,
  deleteThesisRequest,
} = require("../service/ThesisRequestService.js");
const {
  isProfessor,
  isSecretaryClerck,
  isStudent,
} = require("../utils/checkRole.js");

beforeEach(() => {
  jest.resetAllMocks();
});

jest.mock("../service/ThesisRequestService.js", () => ({
  getThesisRequestsForProfessor: jest.fn(),
  getThesisRequestsForSecretary: jest.fn(),
  getThesisRequestsForStudent: jest.fn(),
  getThesisRequestById: jest.fn(),
  insertNewThesisRequest: jest.fn(),
  updateThesisRequestForSecretary: jest.fn(),
  updateThesisRequestForProfessor: jest.fn(),
  updateThesisRequestForStudent: jest.fn(),
  deleteThesisRequest: jest.fn(),
}));

jest.mock("../utils/checkRole.js", () => ({
  isSecretaryClerck: jest.fn(),
  isProfessor: jest.fn(),
  isStudent: jest.fn(),
}));

const mockRes = {
  writeHead: jest.fn().mockReturnThis(),
  end: jest.fn().mockReturnThis(),
};
const mockNext = {};

describe("getThesisRequests ", () => {
  test("should respond with 200 - as Secretary Clerk", async () => {
    const mockReq = {
      user: {
        userId: "s123654",
      },
    };

    const thesisRequestsForSecretary = ["thesisRequest1", "thesisRequest2"];

    isSecretaryClerck.mockResolvedValue();

    getThesisRequestsForSecretary.mockResolvedValue(thesisRequestsForSecretary);

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
  test("should respond with 200 - as student", async () => {
    const mockReq = {
      user: {
        userId: "s123654",
      },
    };

    const thesisRequestsForStudent = ["thesisRequest1", "thesisRequest2"];

    isStudent.mockResolvedValue();

    getThesisRequestsForStudent.mockResolvedValue(thesisRequestsForStudent);

    await ThesisRequestController.getThesisRequests(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify(thesisRequestsForStudent, null, 2)
    );
  });
  test("should respond with 400 - Bad Request", async () => {
    const mockReq = {
      user: {
        studentId: "s123456",
      },
    };

    await ThesisRequestController.getThesisRequests(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(400, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify({ error: "Bad Request" }, null, 2)
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
  test("should respond with 400 Bad Request", async () => {
    const mockReq = {
      user: {},
      params: {},
    };

    await ThesisRequestController.getThesisRequestById(
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
  test("should respond with 400 Bad Request", async () => {
    const mockReq = {
      user: {},
      body: {},
    };

    await ThesisRequestController.insertNewThesisRequest(
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

describe("updateThesisRequest", () => {
  test("should respond with 200 - as Secretary Clerk", async () => {
    const mockReq = {
      user: {
        userId: "s123654",
      },
      body: {},
      params: {
        thesisRequestId: "123",
      },
    };

    const thesisRequestUpdatedforSecretary = ["thesisRequestUpdated"];

    isSecretaryClerck.mockResolvedValue();

    updateThesisRequestForSecretary.mockResolvedValue(
      thesisRequestUpdatedforSecretary
    );

    await ThesisRequestController.updateThesisRequest(
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify(thesisRequestUpdatedforSecretary, null, 2)
    );
  });
  test("should respond with 200 - as professor", async () => {
    const mockReq = {
      user: {
        userId: "p123652",
      },
      body: {},
      params: {
        thesisRequestId: "123",
      },
    };

    const thesisRequestUpdatedforProfessor = ["thesisRequestUpdated"];

    isProfessor.mockResolvedValue();

    updateThesisRequestForProfessor.mockResolvedValue(
      thesisRequestUpdatedforProfessor
    );

    await ThesisRequestController.updateThesisRequest(
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify(thesisRequestUpdatedforProfessor, null, 2)
    );
  });
  test("should respond with 200 - as student", async () => {
    const mockReq = {
      user: {
        userId: "s123654",
      },
      body: {},
      params: {
        thesisRequestId: "123",
      },
    };

    const thesisRequestUpdatedforStudent = ["thesisRequestUpdated"];

    isStudent.mockResolvedValue();

    updateThesisRequestForStudent.mockResolvedValue(
      thesisRequestUpdatedforStudent
    );

    await ThesisRequestController.updateThesisRequest(
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify(thesisRequestUpdatedforStudent, null, 2)
    );
  });
  test("should respond with 400 Bad Request", async () => {
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

    expect(mockRes.writeHead).toHaveBeenCalledWith(400, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify({ error: "Bad Request" }, null, 2)
    );
  });
});

describe("deleteThesisRequest", () => {
  test("should respond with 204", async () => {
    const mockReq = {
      user: {
        userId: "s123654",
      },
      body: {},
      params: {
        thesisRequestId: 3,
      },
    };

    isStudent.mockResolvedValue();

    deleteThesisRequest.mockResolvedValue();

    await ThesisRequestController.deleteThesisRequest(
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockRes.writeHead).toHaveBeenCalledWith(204, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith("No Content");
  });
  test("should respond with 400 Bad Request", async () => {
    const mockReq = {
      user: {},
      body: {},
      params: {},
    };

    await ThesisRequestController.deleteThesisRequest(
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
