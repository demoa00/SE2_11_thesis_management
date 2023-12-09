'use strict';

const dayjs = require('dayjs');

const checkRole = require('../utils/checkRole');
const smtp = require('../utils/smtp');
const { PromiseError } = require('../utils/error');

const db = require('../utils/dbConnection');


exports.getThesisRequestsForProfessor = function (professorId, filter) {
    return new Promise(function (resolve, reject) {
        let sql = ""
        if (filter?.cosupervisor) {
            filter.cosupervisor = filter.cosupervisor instanceof Array ? filter.cosupervisor[0] : filter.cosupervisor;
            if (filter.cosupervisor === 'false') {
                sql = "SELECT * FROM thesisRequests, professor WHERE supervisor = ? AND professor.professorId = thesisRequest.supervisor";

            } else if (filter.cosupervisor === 'true') {
                sql = 'SELECT * FROM thesisRequests WHERE thesisProposalId IN (SELECT thesisProposalId FROM thesisProposal_internalCoSupervisor_bridge WHERE internalCoSupervisorId = ?)';
            }
        } else {
            resolve();
        }
        db.all(sql, [professorId], function (err, rows) {
            if (err) {
                reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
            } else if (rows.length == 0) {
                reject(new PromiseError({ code: 404, message: "Not Found" }));
            } else {
                let list = rows.map((r) => ({
                    thesisProposalId: r.thesisProposalId,
                    title: r.title,
                    studentId: r.studentId,
                    self: `/api/thesisRequests/${r.thesisRequestId}`
                })
                );
                resolve(list)
            }
        })

    });
}


exports.getThesisRequestsForSecretary = function () {
    return new Promise(function (resolve, reject) {
        const sql = "SELECT * FROM thesisRequests";
        db.all(sql, [], function (err, rows) {
            if (err) {
                reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
            } else if (rows.length == 0) {
                reject(new PromiseError({ code: 404, message: "Not Found" }));
            } else {
                let list = rows.map((r) => ({
                    thesisProposalId: r.thesisProposalId,
                    title: r.title,
                    studentId: r.studentId,
                    self: `/api/thesisRequests/${r.thesisRequestId}`
                })
                );
                resolve(list)
            }
        });
    });
}

exports.getThesisRequestById = function () {
    return new Promise(function (resolve, reject) {
        //to do
    });
}

exports.insertNewThesisRequest = function (studentId, thesisRequest) {
    return new Promise(function (resolve, reject) {
        const sql = "SELECT supervisor FROM thesisProposals WHERE thesisProposalId = ?";
        db.get(sql, [thesisRequest.thesisProposalId], function (err, row) {
            if (err) {
                reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
            } else if (row == undefined) {
                reject(new PromiseError({ code: 404, message: "Not Found" }));
            } else {
                resolve(row.supervisor);
            }
        })
    }).then((professorId) => {
        return new Promise(function (resolve, reject) {
            const sql = "INSERT INTO thesisRequests(thesisProposalId, studentId, title, supervisor, description) VALUES(?,?,?,?,?)";
            db.run(sql, [thesisRequest.thesisProposalId, studentId, thesisRequest.title, professorId, thesisRequest.description], function (err) {
                if (err) {
                    reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
                } else {
                    resolve({ newThesisRequest: `/api/thesisrequests/${lastID}` });
                }
            })
        });
    })

}

exports.updateThesisRequest = function () {
    return new Promise(function (resolve, reject) {
        //to do
    });
}