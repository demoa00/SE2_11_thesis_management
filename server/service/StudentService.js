'use strict';

const db = require('../utils/dbConnection');


exports.getStudentByEmail = function (email) {
  return new Promise(function (resolve, reject) {
    let sql = 'SELECT * FROM students WHERE email = ?';

    db.get(sql, [email], (err, row) => {
      if (err) {
        reject({ code: 500, message: "Internal Server Error" });
      } else if (row == undefined) {
        reject({ code: 404, message: "Not Found" });
      } else {
        let student = {
          userId: row.studentId,
          email: row.email,
          codDegree: row.codDegree,
          role: 'student'
        };

        resolve(student);
      }
    });
  });
}

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
