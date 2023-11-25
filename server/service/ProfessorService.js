'use strict';

const sqlite = require('sqlite3');

const db = new sqlite.Database('./database/thesis_management.sqlite', (err) => { if (err) throw err; });


exports.getProfessors = function () {
  return new Promise(function (resolve, reject) {
    const sql = 'SELECT * FROM professors';

    db.all(sql, [], (err, rows) => {
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
