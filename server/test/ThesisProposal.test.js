"use strict";

const ThesisProposalController = require("../controllers/ThesisProposalController.js");
const {
  getThesisProposalsForStudent,
  getThesisProposalsForProfessor,
  getThesisProposalById,
  insertNewThesisProposal,
  updateThesisProposal,
  archiveThesisProposal,
  deleteThesisProposal,
} = require("../service/ThesisProposalService.js");
const checkRole = require("../utils/checkRole.js");

beforeEach(() => {
  jest.resetAllMocks();
});

jest.mock("../service/ThesisProposalService.js", () => ({
  getThesisProposalsForStudent: jest.fn(),
  getThesisProposalsForProfessor: jest.fn(),
  getThesisProposalById: jest.fn(),
  insertNewThesisProposal: jest.fn(),
  updateThesisProposal: jest.fn(),
  archiveThesisProposal: jest.fn(),
  deleteThesisProposal: jest.fn(),
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

describe("getThesisProposals ", () => {
  test("should respond with 200 - as student", async () => {
    const mockReq = {
      user: {
        studentId: "s123456",
      },
    };

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

    const thesisProposalsForProfessor = ["thesisProposal1", "thesisProposal2"];

    checkRole.isProfessor.mockResolvedValue(true);

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
  test("should respond with 404 Bad Request", async () => {
    const mockReq = {
      user: {},
      params: {},
    };

    await ThesisProposalController.getThesisProposalById(
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
  test("should respond with 404 not found - no thesisProposal available", async () => {
    const mockReq = {
      user: {
        professorId: "p123654",
      },
      params: {
        thesisProposalId: 11,
      },
    };

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
        userId: "p123654",
      },
      body: {},
    };

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
  test("should respond with 404 Bad Request", async () => {
    const mockReq = {
      user: {},
      body: {},
    };

    await ThesisProposalController.insertNewThesisProposal(
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

describe("updateThesisProposal", () => {
  test("should respond with 200", async () => {
    const mockReq = {
      user: {
        userId: "p123654",
      },
      body: {},
      params: {
        thesisProposalId: {},
      },
    };

    const thesisProposalUpdated = {
      thesisProposalUpdated: "/api/thesisProposals/24",
    };

    updateThesisProposal.mockResolvedValue(thesisProposalUpdated);

    await ThesisProposalController.updateThesisProposal(
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify(thesisProposalUpdated, null, 2)
    );
  });
  test("should respond with 404 Bad Request", async () => {
    const mockReq = {
      user: {},
      body: {},
      params: {},
    };

    await ThesisProposalController.updateThesisProposal(
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

describe("archiveThesisProposal", () => {
  test("should respond with 204", async () => {
    const mockReq = {
      user: {
        userId: "p123654",
      },
      body: {},
      params: {
        thesisProposalId: {},
      },
    };

    archiveThesisProposal.mockResolvedValue();

    await ThesisProposalController.archiveThesisProposal(
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockRes.writeHead).toHaveBeenCalledWith(204, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith("No Content");
  });
  test("should respond with 404 Bad Request", async () => {
    const mockReq = {
      user: {},
      body: {},
      params: {},
    };

    await ThesisProposalController.archiveThesisProposal(
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

describe("deleteThesisProposal", () => {
  test("should respond with 204", async () => {
    const mockReq = {
      user: {
        userId: "p123654",
      },
      body: {},
      params: {
        thesisProposalId: {},
      },
    };

    deleteThesisProposal.mockResolvedValue();

    await ThesisProposalController.deleteThesisProposal(
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockRes.writeHead).toHaveBeenCalledWith(204, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith("No Content");
  });
  test("should respond with 404 Bad Request", async () => {
    const mockReq = {
      user: {},
      body: {},
      params: {},
    };

    await ThesisProposalController.deleteThesisProposal(
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
