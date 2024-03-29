'use strict';

const checkRole = require('../utils/checkRole');
const { PromiseError, InternalError } = require('../utils/error');

const db = require('../utils/dbConnection');


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
        reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
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
        reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
      } else if (row === undefined) {
        reject(new PromiseError({ code: 404, message: "Not Found" }));
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
  return new Promise(function (resolve, reject) {
    const sql = "SELECT thesisProposal_externalCoSupervisor_bridge.externalCoSupervisorId, email FROM thesisProposal_externalCoSupervisor_bridge, externalCoSupervisors WHERE thesisProposalId = ? AND thesisProposal_externalCoSupervisor_bridge.externalCoSupervisorId = externalCoSupervisors.externalCoSupervisorId";
    db.all(sql, [thesisProposalId], function (err, rows) {
      if (err) {
        reject(new InternalError());
      } else if (rows.length === 0) {
        resolve([]);
      } else {
        let cosupervisors = rows.map((r) => ({ coSupervisorId: r.externalCoSupervisorId, email: r.email }));

        resolve(cosupervisors);
      }
    });
  });
}
