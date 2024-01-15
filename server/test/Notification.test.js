"use strict";

const NotificationController = require("../controllers/NotificationController.js");
const {
  getNotifications,
  updateNotification,
  deleteAllNotifications,
} = require("../service/NotificationService.js");

beforeEach(() => {
  jest.resetAllMocks();
});

jest.mock("../service/NotificationService.js", () => ({
  getNotifications: jest.fn(),
  updateNotification: jest.fn(),
  deleteAllNotifications: jest.fn(),
}));

const mockRes = {
  writeHead: jest.fn().mockReturnThis(),
  end: jest.fn().mockReturnThis(),
};
const mockNext = {};

describe("getNotifications ", () => {
  test("should respond with 200", async () => {
    const mockReq = {
      user: {
        userId: "s123456",
      },
    };

    const notificationsList = ["notification1", "notification2"];

    getNotifications.mockResolvedValue(notificationsList);

    await NotificationController.getNotifications(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify(notificationsList, null, 2)
    );
  });
  test("should respond with 400 Bad Request", async () => {
    const mockReq = {
      user: {},
    };

    const notificationsList = ["notification1", "notification2"];

    getNotifications.mockResolvedValue(notificationsList);

    await NotificationController.getNotifications(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(400, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify({ error: "Bad Request" }, null, 2)
    );
  });
  test("should respond with 404 not found", async () => {
    const mockReq = {
      user: {
        userId: "s123456",
      },
    };

    getNotifications.mockRejectedValue({
      code: 404,
      message: "Not Found",
    });

    await NotificationController.getNotifications(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(404, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify({ error: "Not Found" }, null, 2)
    );
  });
});

describe("updateNotification ", () => {
  test("should respond with 204", async () => {
    const mockReq = {
      user: {
        userId: "s123456",
      },
      params: {
        notificationId: "123",
      },
    };

    updateNotification.mockResolvedValue();

    await NotificationController.updateNotification(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(204, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith("No Content");
  });
  test("should respond with 400 Bad Request", async () => {
    const mockReq = {
      user: {},
      params: {},
    };

    await NotificationController.updateNotification(mockReq, mockRes, mockNext);

    expect(mockRes.writeHead).toHaveBeenCalledWith(400, {
      "Content-Type": "application/json",
    });
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify({ error: "Bad Request" }, null, 2)
    );
  });
});

describe("deleteNotification ", () => {
  test("should respond with 204", async () => {
    const mockReq = {
      user: {
        userId: "s123456",
      },
    };

    deleteAllNotifications.mockResolvedValue();

    await NotificationController.deleteAllNotifications(
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
    };

    await NotificationController.deleteAllNotifications(
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
