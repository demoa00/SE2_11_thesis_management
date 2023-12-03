"use strict";

const ThesisProposalController = require("../controllers/ThesisProposalController.js");
const {
  getThesisProposalsForStudent,
  getThesisProposalsForProfessor,
  getThesisProposalById,
  insertNewThesisProposal,
} = require("../service/ThesisProposalService.js");
const checkRole = require("../utils/checkRole.js");

beforeEach(() => {
  getThesisProposalsForStudent.mockClear();
  getThesisProposalsForProfessor.mockClear();
  getThesisProposalById.mockClear();
  insertNewThesisProposal.mockClear();
  jest.clearAllMocks();
});

jest.mock("../service/ThesisProposalService.js", () => ({
  getThesisProposalsForStudent: jest.fn(),
  getThesisProposalsForProfessor: jest.fn(),
  getThesisProposalById: jest.fn(),
  insertNewThesisProposal: jest.fn(),
}));

jest.mock("../utils/checkRole.js", () => ({
  isStudent: jest.fn(),
  isProfessor: jest.fn(),
}));

describe("getThesisProposals ", () => {
  test("should respond with 200 - as student", async () => {
    const mockReq = {
      user: {
        studentId: "s123456",
      },
    };
    const mockRes = {
      writeHead: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    };
    const mockNext = {};

    const thesisProposalsForStudent = ["thesisProposal1", "thesisProposal2"];

    checkRole.isStudent.mockResolvedValue("student");

    getThesisProposalsForStudent.mockResolvedValue(thesisProposalsForStudent);

    await ThesisProposalController.getThesisProposals(
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify(thesisProposalsForStudent, null, 2)
    );
  });
  test("should respond with 200 - as professor", async () => {
    const mockReq = {
      user: {
        professorId: "p123654",
      },
    };
    const mockRes = {
      writeHead: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    };
    const mockNext = {};

    const thesisProposalsForProfessor = ["thesisProposal1", "thesisProposal2"];

    checkRole.isProfessor.mockResolvedValue("professor");

    getThesisProposalsForProfessor.mockResolvedValue(
      thesisProposalsForProfessor
    );

    await ThesisProposalController.getThesisProposals(
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify(thesisProposalsForProfessor, null, 2)
    );
  });
  test("should respond with 404 not found - no thesisProposals available", async () => {
    const mockReq = {
      user: {
        studentId: "s123456",
      },
    };
    const mockRes = {
      writeHead: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    };
    const mockNext = {};

    checkRole.isStudent.mockResolvedValue("student");

    getThesisProposalsForStudent.mockRejectedValue({
      code: 404,
      message: "Not Found",
    });

    await ThesisProposalController.getThesisProposals(
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockRes.writeHead).toHaveBeenCalledWith(404, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify({ error: "Not Found" }, null, 2)
    );
  });
});

describe("getThesisProposalById", () => {
  test("should respond with 200 - as student", async () => {
    const mockReq = {
      user: {
        studentId: "s123456",
      },
      params: {
        thesisProposalId: 11,
      },
    };
    const mockRes = {
      writeHead: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    };
    const mockNext = {};

    const thesisProposal = {
      thesisProposalId: 11,
      title:
        "Development of a Secure and Scalable Cloud-Based Infrastructure for Software Development",
      name: "Richard",
      surname: "Davis",
      keywords: ["cloud computing", "software development", "security"],
      expirationDate: "2024-05-31",
      self: "/api/thesisproposals/11",
    };

    getThesisProposalById.mockResolvedValue(thesisProposal);

    await ThesisProposalController.getThesisProposalById(
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });

    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify(thesisProposal, null, 2)
    );
  });
  test("should respond with 200 - as professor", async () => {
    const mockReq = {
      user: {
        professorId: "p123654",
      },
      params: {
        thesisProposalId: 11,
      },
    };
    const mockRes = {
      writeHead: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    };
    const mockNext = {};

    const thesisProposal = {
      thesisProposalId: 11,
      title:
        "Development of a Secure and Scalable Cloud-Based Infrastructure for Software Development",
      name: "Richard",
      surname: "Davis",
      keywords: ["cloud computing", "software development", "security"],
      expirationDate: "2024-05-31",
      self: "/api/thesisproposals/11",
    };

    getThesisProposalById.mockResolvedValue(thesisProposal);

    await ThesisProposalController.getThesisProposalById(
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });

    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify(thesisProposal, null, 2)
    );
  });
  test("should respond with 404 not found - no thesisProposal available", async () => {
    const mockReq = {
      user: {
        professorId: "p123654",
      },
      params: {
        thesisProposalId: 11,
      },
    };
    const mockRes = {
      writeHead: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    };
    const mockNext = {};

    const thesisProposal = {
      thesisProposalId: 11,
      title:
        "Development of a Secure and Scalable Cloud-Based Infrastructure for Software Development",
      name: "Richard",
      surname: "Davis",
      keywords: ["cloud computing", "software development", "security"],
      expirationDate: "2024-05-31",
      self: "/api/thesisproposals/11",
    };

    getThesisProposalById.mockRejectedValue({
      code: 404,
      message: "Not Found",
    });

    await ThesisProposalController.getThesisProposalById(
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockRes.writeHead).toHaveBeenCalledWith(404, {
      "Content-Type": "application/json",
    });

    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify({ error: "Not Found" }, null, 2)
    );
  });
});

describe("insertNewThesisProposal", () => {
  test("should respond with 201", async () => {
    const mockReq = {
      user: {
        professorId: "p123654",
      },
      params: {
        professorId: "p123654",
      },
    };
    const mockRes = {
      writeHead: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    };
    const mockNext = {};

    const newThesisProposal = {
      newThesisProposal: "/api/thesisProposals/24",
    };

    insertNewThesisProposal.mockResolvedValue(newThesisProposal);

    await ThesisProposalController.insertNewThesisProposal(
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockRes.writeHead).toHaveBeenCalledWith(201, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify(newThesisProposal, null, 2)
    );
  });
});
