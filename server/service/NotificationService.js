'use strict';

const dayjs = require('dayjs');

const ThesisProposal = require('./ThesisProposalService');
const ThesisRequest = require('./ThesisRequestService');
const Notification = require('./NotificationService');
const { PromiseError, InternalError } = require('../utils/error');
const smtp = require('../utils/smtp');

const db = require('../utils/dbConnection');


exports.getNotifications = function (userId) {
    return new Promise(function (resolve, reject) {
        const sql = 'SELECT * FROM notifications WHERE userId = ?';

        db.all(sql, [userId], (err, rows) => {
            if (err) {
                reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
            } else if (rows.length == 0) {
                resolve([]);
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
                reject(new InternalError());
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

exports.thesisProposalExpirationNotification = function () {
    let promises = [];
    let emailPromises = [];
    let notificationPromises = [];
    let thesisProposalIds = [];

    return new Promise(function (resolve, reject) {
        const sql = "SELECT thesisProposals.thesisProposalId, thesisProposals.supervisor, thesisProposals.title, thesisProposals.expirationDate, professors.email FROM thesisProposals, professors WHERE professors.professorId = thesisProposals.supervisor";

        db.all(sql, [], (err, rows) => {
            if (err) {
                resolve();
            } else {
                rows.forEach((r) => {
                    if (dayjs().diff(r.expirationDate, "day") === -7) {
                        emailPromises.push(smtp.sendMail(smtp.mailConstructor(r.email, smtp.subjectThesisProposalExpiring, `${smtp.textThesisProposalExpiring} ${r.title}`)));
                        notificationPromises.push(Notification.insertNewNotification(r.supervisor, smtp.subjectThesisProposalExpiring, 12));
                    } else if (dayjs().diff(r.expirationDate, "day") === 0) {
                        thesisProposalIds.push(r.thesisProposalId);
                        promises.push(ThesisProposal.archiveThesisProposal(r.thesisProposalId, r.supervisor));
                    }
                });
                resolve(thesisProposalIds);
            }
        });
    }).then(async (thesisProposalIds) => {
        for (let id in thesisProposalIds) {
            let thesisRequest = await ThesisRequest.getThesisRequestByThesisProposalId(id);
            if (thesisRequest != undefined) {
                promises.push(ThesisRequest.deleteThesisRequest(thesisRequest.studentId, thesisRequest.thesisRequestId));
                emailPromises.push(smtp.sendMail(smtp.mailConstructor(thesisRequest.email, smtp.subjectThesisRequestExpired, `${smtp.textThesisRequestExpiring} ${thesisRequest.title}`)));
                notificationPromises.push(Notification.insertNewNotification(thesisRequest.studentId, smtp.subjectThesisRequestExpired, 13));
            }
        }
    }).then(async () => {
        try {
            await Promise.all(promises);
            await Promise.all(emailPromises);
            await Promise.all(notificationPromises);
        } catch (error) {
            console.log(error);
        }
    });
}
