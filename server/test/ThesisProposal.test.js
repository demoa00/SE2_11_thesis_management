"use strict";

const ThesisProposalController = require("../controllers/ThesisProposal.js");
const {
  getThesisProposals,
  getThesisProposal,
  getThesisProposalsOfProfessor,
} = require("../service/ThesisProposalService.js");

beforeEach(() => {
  getThesisProposals.mockClear();
  getThesisProposal.mockClear();
  jest.clearAllMocks();
});

jest.mock("../service/ThesisProposalService.js", () => ({
  getThesisProposals: jest.fn(),
  getThesisProposal: jest.fn(),
}));

describe("getThesisProposals", () => {
  test("should respond with 200", async () => {
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

    const thesisProposalsList = [
      {
        thesisProposalId: 11,
        title:
          "Development of a Secure and Scalable Cloud-Based Infrastructure for Software Development",
        name: "Richard",
        surname: "Davis",
        keywords: ["cloud computing", "software development", "security"],
        expirationDate: "2024-05-31",
        self: "/api/thesisproposals/11",
      },
    ];

    getThesisProposals.mockResolvedValue(thesisProposalsList);

    await ThesisProposalController.getThesisProposals(
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify(thesisProposalsList, null, 2)
    );
  });
  test("should respond with 403 forbidden", async () => {
    const mockReq = {
      user: {},
    };
    const mockRes = {
      writeHead: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    };
    const mockNext = {};

    await ThesisProposalController.getThesisProposals(
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockRes.writeHead).toHaveBeenCalledWith(403, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify({ error: "Forbidden" }, null, 2)
    );
  });
  test("should respond with 404 not found", async () => {
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

    getThesisProposals.mockRejectedValue({ code: 404, message: "Not Found" });

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

describe("getThesisProposalStudent", () => {
  test("should respond with 200", async () => {
    const mockReq = {
      params: {
        thesisProposalId: 11,
      },
      user: {
        studentId: "s123456",
      },
    };
    const mockRes = {
      writeHead: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    };
    const mockNext = {};

    const thesisProposal = [
      {
        thesisProposalId: 11,
        title:
          "Development of a Secure and Scalable Cloud-Based Infrastructure for Software Development",
        supervisor: {
          professorId: "p123654",
          name: "Richard",
          surname: "Davis",
          professor: "/api/professors/p123654",
        },
        coSupervisor: [
          {
            coSupervisorId: "p456987",
            name: "Mark",
            surname: "Wilson",
            coSupervisor: "/api/professors/p456987",
          },
          {
            coSupervisorId: "e987654",
            name: "Peter",
            surname: "Jones",
            coSupervisor: "/api/externalCoSupervisors/e987654",
          },
        ],
        keywords: ["cloud computing", "software development", "security"],
        description:
          "This thesis proposal aims to develop a secure and scalable cloud-based infrastructure to support software development activities. The infrastructure will be designed using cloud computing technologies, such as virtualization, containers, and microservices. The infrastructure will be evaluated for its security, scalability, and performance.",
        thesisType: "In Company",
        abroad: false,
        groups: ["CG_07", "CG_08"],
        expirationDate: "2024-05-31",
        level: "MSc",
        CdS: [
          {
            degreeId: "LM-9",
            titleDegree: "Master in Software Engineering",
          },
        ],
      },
    ];

    getThesisProposal.mockResolvedValue(thesisProposal);

    await ThesisProposalController.getThesisProposalStudent(
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
  test("should respond with 403 forbidden", async () => {
    const mockReq = {
      params: {
        thesisProposalId: 11,
      },
      user: {
        professorId: "p123654",
      },
    };
    const mockRes = {
      writeHead: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    };
    const mockNext = {};

    const thesisProposal = [
      {
        thesisProposalId: 11,
        title:
          "Development of a Secure and Scalable Cloud-Based Infrastructure for Software Development",
        supervisor: {
          professorId: "p123654",
          name: "Richard",
          surname: "Davis",
          professor: "/api/professors/p123654",
        },
        coSupervisor: [
          {
            coSupervisorId: "p456987",
            name: "Mark",
            surname: "Wilson",
            coSupervisor: "/api/professors/p456987",
          },
          {
            coSupervisorId: "e987654",
            name: "Peter",
            surname: "Jones",
            coSupervisor: "/api/externalCoSupervisors/e987654",
          },
        ],
        keywords: ["cloud computing", "software development", "security"],
        description:
          "This thesis proposal aims to develop a secure and scalable cloud-based infrastructure to support software development activities. The infrastructure will be designed using cloud computing technologies, such as virtualization, containers, and microservices. The infrastructure will be evaluated for its security, scalability, and performance.",
        thesisType: "In Company",
        abroad: false,
        groups: ["CG_07", "CG_08"],
        expirationDate: "2024-05-31",
        level: "MSc",
        CdS: [
          {
            degreeId: "LM-9",
            titleDegree: "Master in Software Engineering",
          },
        ],
      },
    ];

    getThesisProposal.mockResolvedValue(thesisProposal);

    await ThesisProposalController.getThesisProposalStudent(
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockRes.writeHead).toHaveBeenCalledWith(403, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify({ error: "Forbidden" }, null, 2)
    );
  });
  test("should respond with 404 not found", async () => {
    const mockReq = {
      params: {
        thesisProposalId: 12,
      },
      user: {
        studentId: "s123456",
      },
    };
    const mockRes = {
      writeHead: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    };
    const mockNext = {};

    getThesisProposal.mockRejectedValue({ code: 404, message: "Not Found" });

    await ThesisProposalController.getThesisProposalStudent(
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
  test("should respond with missing parameters", async () => {});
});
