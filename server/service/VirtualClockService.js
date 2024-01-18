'use strict';

const dayjs = require('dayjs');

const ThesisProposal = require('./ThesisProposalService');
const ThesisRequest = require('./ThesisRequestService');
const Notification = require('./NotificationService');
const smtp = require('../utils/smtp');
const { PromiseError } = require('../utils/error');

const db = require('../utils/dbConnection');


exports.updateVirtualClock = function (date) {
    return new Promise(function (resolve, reject) {
        const sql = "SELECT thesisProposalId FROM thesisProposals WHERE expirationDate <= ?";

        db.all(sql, [dayjs(date).format('YYYY-MM-DD')], (err, rows) => {
            if (err) {
                reject(new PromiseError({ message: "Internal Server Error", code: 500 }));
            } else {
                let thesisProposalIdList = rows.map((r) => r.thesisProposalId);

                resolve(thesisProposalIdList);
            }
        });
    }).then(async (thesisProposalIdList) => {
        let promises = [];

        thesisProposalIdList.forEach((t) => {
            promises.push(ThesisProposal.archiveThesisProposal(t));
        });

        await Promise.all(promises);
        return thesisProposalIdList;
    }).then(async (thesisProposalIdList) => {
        let promises = [];
        let emailPromises = [];
        let notificationPromises = [];

        try {
            for (let id of thesisProposalIdList) {
                let thesisRequest = await ThesisRequest.getThesisRequestByThesisProposalId(id);

                if (thesisRequest != undefined) {
                    promises.push(ThesisRequest.deleteThesisRequest(thesisRequest.studentId, thesisRequest.thesisRequestId));
                    emailPromises.push(smtp.sendMail(smtp.mailConstructor(thesisRequest.email, smtp.subjectThesisRequestExpired, `${smtp.textThesisRequestExpiring} ${thesisRequest.title}`)));
                    notificationPromises.push(Notification.insertNewNotification(thesisRequest.studentId, smtp.subjectThesisRequestExpired, 13));

                    if (thesisRequest.thesisProposalId != null) {
                        await ThesisProposal.updateAcceptedApplication(thesisRequest.thesisProposalId);
                    }
                }
            }

            await Promise.all(promises);
            await Promise.all(notificationPromises);
            await Promise.all(emailPromises);

            return;
        } catch (error) {
            return;
        }
    });
}
