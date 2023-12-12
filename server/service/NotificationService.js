'use strict';

const dayjs = require('dayjs');

const {PromiseError} = require('../utils/error');

const db = require('../utils/dbConnection');


exports.getNotifications = function (userId) {
    return new Promise(function (resolve, reject) {
        const sql = 'SELECT * FROM notifications WHERE userId = ?';

        db.all(sql, [userId], (err, rows) => {
            if (err) {
                reject(new PromiseError({code: 500, message: "Internal Server Error"}));
            } else if (rows.length == 0) {
                reject(new PromiseError({code: 404, message: "Not Found"}));
            } else {
                let notifications = rows.map((r) => ({
                    notificationId: r.notificationId,
                    userId: r.userId,
                    message: r.message,
                    date: r.date,
                    isRead: r.isRead,
                    type: r.type
                }));

                resolve(notifications);
            }
        });
    });
}

exports.insertNewNotification = function (userId, message, type) {
    return new Promise(function (resolve, reject) {
        const sql = 'INSERT INTO notifications(userId, message, date, type) VALUES (?, ?, ?, ?)';

        db.run(sql, [userId, message, dayjs().format('YYYY-MM-DD'), type], function (err) {
            if (err) {
                reject(new PromiseError({code: 500, message: "Internal Server Error"}));
            } else {
                resolve();
            }
        });
    }).then(() => {
        io.to(userId).emit('message', 'New Notification');
    });
}

exports.updateNotification = function (userId, notificationId) {
    return new Promise(function (resolve, reject) {
        const sql = 'UPDATE notifications SET isRead = 1 WHERE notificationId = ? AND userId = ?';

        db.run(sql, [notificationId, userId], function (err) {
            if (err) {
                reject(new PromiseError({code: 500, message: "Internal Server Error"}));
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
                reject(new PromiseError({message: 'Internal Server Error', code: 500}));
            } else {
                resolve();
            }
        });
    });
}
