'use strict';

const { PromiseError } = require('../utils/error');

const db = require('../utils/dbConnection');


exports.getDegrees = function () {
  return new Promise(function (resolve, reject) {
    const sql = 'SELECT * FROM degrees';

    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
      } else if (rows.length == 0) {
        reject(new PromiseError({ code: 404, message: "Not Found" }));
      } else {
        let degreesList = rows.map((r) => ({ degreeId: r.degreeId, titleDegree: r.titleDegree }));

        resolve(degreesList.sort((a, b) => a.titleDegree.localeCompare(b.titleDegree)));
      }
    })
  });
}

exports.getDegreeById = function (degreeId) {
  return new Promise(function (resolve, reject) {
    const sql = 'SELECT * FROM degrees WHERE degreeId = ?';

    db.get(sql, [degreeId], (err, row) => {
      if (err) {
        reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
      } else if (row == undefined) {
        reject(new PromiseError({ code: 404, message: "Not Found" }));
      } else {
        let degree = {
          degreeId: row.degreeId,
          titleDegree: row.titleDegree
        };

        resolve(degree);
      }
    });
  })
}

exports.getDegreesByThesisProposalId = function (thesisProposalId) {
  return new Promise(function (resolve, reject) {
    const sql = 'SELECT * FROM thesisProposal_cds_bridge WHERE thesisProposalId = ?';

    db.all(sql, [thesisProposalId], (err, rows) => {
      if (err) {
        reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
      } else if (rows.length == 0) {
        resolve([]);
      } else {
        let degreesList = rows.map((r) => r.cdsId);

        resolve(degreesList);
      }
    })
  });
}
