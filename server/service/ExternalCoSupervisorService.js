'use strict';

const sqlite = require('sqlite3');
const checkRole = require('../utils/checkRole');

const db = new sqlite.Database('./database/thesis_management.sqlite', (err) => { if (err) throw err; });


exports.getExternalCoSupervisors = function (user) {
  return new Promise(function (resolve, reject) {
    let sql = 'SELECT * FROM externalCoSupervisors ';
    let params = [];

    if (checkRole.isStudent(user)) {
      sql += 'WHERE externalCoSupervisorId IN (SELECT DISTINCT externalCoSupervisorId FROM thesisProposal_cds_bridge, thesisProposal_externalCoSupervisor_bridge WHERE thesisProposal_cds_bridge.cdsId = ? AND thesisProposal_externalCoSupervisor_bridge.thesisProposalId = thesisProposal_cds_bridge.thesisProposalId) ';
      params = [user.codDegree];
    }

    sql += 'ORDER BY surname ';

    db.all(sql, params, (err, rows) => {
      if (err) {
        reject({ code: 500, message: "Internal Server Error" });
      } else {
        let externalCoSupervisorsList = rows.map((r) => ({
          externalCoSupervisorId: r.externalCoSupervisorId,
          name: r.name,
          surname: r.surname,
          self: `/api/externalCoSupervisors/${r.externalCoSupervisorId}`
        }));

        resolve(externalCoSupervisorsList);
      }
    });
  });
}

exports.getExternalCoSupervisorById = function (externalCoSupervisorId) {
  return new Promise(function (resolve, reject) {
    const sql = 'SELECT * FROM externalCoSupervisors WHERE externalCoSupervisorId = ?';

    db.get(sql, [externalCoSupervisorId], (err, row) => {
      if (err) {
        reject({ code: 500, message: "Internal Server Error" });
      } else if (row === undefined) {
        reject({ code: 404, message: "Not Found" });
      } else {
        let externalCoSupervisor = {
          externalCoSupervisorId: row.externalCoSupervisorId,
          name: row.name,
          surname: row.surname,
          email: row.email,
          company: row.company,
          self: `/api/externalCoSupervisors/${row.externalCoSupervisorId}`
        };

        resolve(externalCoSupervisor);
      }
    });
  });
}

exports.getExternalCoSupervisorsByThesisProposalId = function (thesisProposalId) {
  return new Promise( function (resolve, reject) {
    const sql = "SELECT externalCoSupervisorId FROM thesisProposal_externalCoSupervisor_bridge WHERE thesisProposalId = ?";
    db.all(sql, [thesisProposalId], function (err, rows) {
      if (err) {
        reject({ code: 500, message: "Internal Server Error" });
      } else {
        resolve(rows);
      }
    });
  });
}