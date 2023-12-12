'use strict';

const dayjs = require('dayjs');

const { PromiseError } = require('../utils/error');

const db = require('../utils/dbConnection');


exports.getNotifications = function (userId) {
    return new Promise(function (resolve, reject) {
        const sql = 'SELECT * FROM notifications WHERE userId = ?';

        db.all(sql, [userId], (err, rows) => {
            if (err) {
                reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
            } else if (rows.length == 0) {
                reject(new PromiseError({ code: 404, message: "Not Found" }));
            } else {
                let notifications = rows.map((r) => ({ notificationId: r.notificationId, userId: r.userId, message: r.message, date: r.date, isRead: r.isRead }));

                resolve(notifications);
            }
        });
    });
}

exports.insertNewNotification = function (userId, message) {
    return new Promise(function (resolve, reject) {
        const sql = 'SELECT notificationId FROM notifications WHERE userId = ? ORDER BY DATE';

        db.all(sql, [userId], (err, rows) => {
            if (err) {
                reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
            } else if (rows.length == 0) {
                resolve(undefined);
            } else {
                let notification = undefined;

                if (rows.length >= 5) {
                    notification = rows.pop();
                }

                resolve(notification.notificationId);
            }
        });
    }).then((notificationId) => {
        return new Promise(function (resolve, reject) {
            if (notificationId != undefined) {
                const sql = 'DELETE FROM notifications WHERE notificationId = ?';

                db.run(sql, [notificationId], function (err) {
                    if (err) {
                        reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
                    } else if (this.changes == 0) {
                        reject(new PromiseError({ code: 404, message: "Not Found" }));
                    }
                });
            }

            resolve();
        });
    }).then(() => {
        return new Promise(function (resolve, reject) {
            const sql = 'INSERT INTO notifications(userId, message, date) VALUES (?, ?, ?)';

            db.run(sql, [userId, message, dayjs().format('YYYY-MM-DD')], function (err) {
                if (err) {
                    reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
                } else {
                    resolve();
                }
            });
        });
    });
}

exports.updateNotification = function (userId, notificationId) {
    return new Promise(function (resolve, reject) {
        const sql = 'UPDATE notifications SET isRead = 1 WHERE notificationId = ? AND userId = ?';

        db.run(sql, [notificationId, userId], function (err) {
            if (err) {
                reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
            } else {
                resolve();
            }
        });
    });
}

exports.deleteAllNotifications = function (userId) {
    return new Promise(function (resolve, reject) {
        const sql = 'DELETE FROM notifications WHERE userId = ?';

        db.run(sql, [userId], function (err) {
            if (err) {
                reject(new PromiseError({ message: 'Internal Server Error', code: 500 }));
            } else {
                resolve();
            }
        });
    });
}
