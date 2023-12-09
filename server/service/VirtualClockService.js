'use strict';

const dayjs = require('dayjs');

const ThesisProposal = require('./ThesisProposalService');

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

        return await Promise.all(promises);
    });
}
