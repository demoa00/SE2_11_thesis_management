'use strict';

const sqlite = require('sqlite3');
const checkRole = require('../utils/checkRole');

const db = new sqlite.Database('./database/thesis_management.sqlite', (err) => { if (err) throw err; });


exports.getProfessors = function (user) {
  let sql = 'SELECT * FROM professors ';
  let params = [];

  if (checkRole.isStudent(user)) {
    sql += 'WHERE professorId IN (SELECT DISTINCT thesisProposals.supervisor FROM thesisProposals, thesisProposal_cds_bridge WHERE thesisProposal_cds_bridge.cdsId = ? AND thesisProposals.thesisProposalId = thesisProposal_cds_bridge.thesisProposalId) ';
    params = [user.codDegree];
  }else if(checkRole.isProfessor(user)){
    sql += 'WHERE professorId != ? ';
    params = [user.userId];
  }

  sql += 'ORDER BY surname';
  
  return new Promise(function (resolve, reject) {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject({ code: 500, message: "Internal Server Error" });
      } else if (rows.length == 0) {
        reject({ code: 404, message: "Not Found" });
      } else {
        let professorsList = rows.map((r) => ({
          professorId: r.professorId,
          name: r.name,
          surname: r.surname,
          self: `/api/professors/${r.professorId}`
        }));

        resolve(professorsList);
      }
    });
  });
}

exports.getProfessorByEmail = function (email) {
  return new Promise(function (resolve, reject) {
    const sql = 'SELECT * FROM professors WHERE email = ?';

    db.get(sql, [email], (err, row) => {
      if (err) {
        reject({ code: 500, message: "Internal Server Error" });
      } else if (row === undefined) {
        reject({ code: 404, message: "Not Found" });
      } else {
        let professor = {
          userId: row.professorId,
          email: row.email,
          codGroup: row.codGroup,
          role: 'professor'
        };

        resolve(professor);
      }
    });
  });
}

exports.getProfessorById = function (professorId) {
  return new Promise(function (resolve, reject) {
    const sql = 'SELECT * FROM professors WHERE professorId = ?';

    db.get(sql, [professorId], (err, row) => {
      if (err) {
        reject({ code: 500, message: "Internal Server Error" });
      } else if (row === undefined) {
        reject({ code: 404, message: "Not Found" });
      } else {
        let professor = {
          professorId: row.professorId,
          name: row.name,
          surname: row.surname,
          email: row.email,
          codGroup: row.codGroup,
          codDepartment: row.codDepartment,
          self: `/api/professors/${row.professorId}`
        };

        resolve(professor);
      }
    });
  });
}
