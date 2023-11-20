"use strict";

const ThesisProposalController = require("../controllers/ThesisProposal.js");
const {
  getThesisProposals,
  getThesisProposal,
  getThesisProposalsOfProfessor,
  insertNewThesisProposal,
} = require("../service/ThesisProposalService.js");

beforeEach(() => {
  getThesisProposals.mockClear();
  getThesisProposal.mockClear();
  getThesisProposalsOfProfessor.mockClear();
  insertNewThesisProposal.mockClear();
  jest.clearAllMocks();
});

jest.mock("../service/ThesisProposalService.js", () => ({
  getThesisProposals: jest.fn(),
  getThesisProposal: jest.fn(),
  getThesisProposalsOfProfessor: jest.fn(),
  insertNewThesisProposal: jest.fn(),
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
  test("should respond with 403 forbidden - missing studentId", async () => {
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
  test("should respond with 403 forbidden - accessing with professorId", async () => {
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
  test("should respond with 404 not found - thesisProposalId not available", async () => {
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
});

describe("getThesisProposalProfessor", () => {
  test("should respond with 200", async () => {
    const mockReq = {
      params: {
        thesisProposalId: 11,
        professorId: "p123654",
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

    await ThesisProposalController.getThesisProposalProfessor(
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
  test("should respond with 403 forbidden - accessing with studentId", async () => {
    const mockReq = {
      params: {
        thesisProposalId: 11,
        professorId: "p123654",
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

    await ThesisProposalController.getThesisProposalProfessor(
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
  test("should respond with 403 forbidden - user.professorId not matching params.professorId", async () => {
    const mockReq = {
      params: {
        thesisProposalId: 11,
        professorId: "p123654",
      },
      user: {
        professorId: "p454334",
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

    await ThesisProposalController.getThesisProposalProfessor(
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
        professorId: "p123654",
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

    getThesisProposal.mockRejectedValue({ code: 404, message: "Not Found" });

    await ThesisProposalController.getThesisProposalProfessor(
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

describe("getThesisProposalsOfProfessor", () => {
  test("should respond with 200", async () => {
    const mockReq = {
      params: {
        thesisProposalId: 11,
        professorId: "p123654",
      },
      user: {
        professorId: "p123654",
      },
      query: {
        position: "supervisor",
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
        keywords: ["cloud computing", "software development", "security"],
        self: "/api/professors/p123654/thesisProposals/11",
      },
    ];

    getThesisProposalsOfProfessor.mockResolvedValue(thesisProposal);

    await ThesisProposalController.getThesisProposalsOfProfessor(
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
  test("should respond with 403 forbidden - user.professorId not matching params.professorId", async () => {
    const mockReq = {
      params: {
        thesisProposalId: 11,
        professorId: "p123654",
      },
      user: {
        professorId: "p454334",
      },
      query: {
        position: "supervisor",
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

    getThesisProposalsOfProfessor.mockResolvedValue(thesisProposal);

    await ThesisProposalController.getThesisProposalsOfProfessor(
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
        thesisProposalId: 11,
        professorId: "p123654",
      },
      user: {
        professorId: "p123654",
      },
      query: {
        position: "supervisor",
      },
    };
    const mockRes = {
      writeHead: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    };
    const mockNext = {};

    getThesisProposalsOfProfessor.mockRejectedValue({
      code: 404,
      message: "Not Found",
    });

    await ThesisProposalController.getThesisProposalsOfProfessor(
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

describe("insertThesisProposal", () => {
  test("should respond with 201", async () => {
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
  test("should respond with 403 forbidden - undefined professorId", async () => {
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

    const newThesisProposal = {
      newThesisProposal: "/api/thesisProposals/24",
    };

    insertNewThesisProposal.mockResolvedValue(newThesisProposal);

    await ThesisProposalController.insertNewThesisProposal(
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
});
