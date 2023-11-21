'use strict';

const sqlite = require('sqlite3');

const db = new sqlite.Database('./database/thesis_management.sqlite', (err) => { if (err) throw err; });


/**
 *
 * studentId String 
 * returns student
 **/
exports.getStudentById = function (studentId) {
  return new Promise(function (resolve, reject) {
    let sql = 'SELECT * FROM students WHERE studentId = ?';

    db.get(sql, [studentId], (err, row) => {
      if (err) {
        reject({ code: 500, message: "Internal Server Error" });
      } else if (row == undefined) {
        reject({ code: 404, message: "Not Found" });
      } else {
        let student = {
          studentId: row.studentId,
          name: row.name,
          surname: row.surname,
          gender: row.gender,
          email: row.email,
          codDegree: row.codDegree,
          nationality: row.nationality,
          cv: "example.pdf",
          self: `/api/students/${studentId}`
        };

        resolve(student);
      }
    });
  });
}

