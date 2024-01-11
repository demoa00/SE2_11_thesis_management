'use strict';

const fs = require('fs');

const { PromiseError, InternalError } = require('../utils/error');

const db = require('../utils/dbConnection');


exports.getStudentByEmail = function (email) {
  return new Promise(function (resolve, reject) {
    let sql = 'SELECT * FROM students WHERE email = ?';

    db.get(sql, [email], (err, row) => {
      if (err) {
        reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
      } else if (row == undefined) {
        reject(new PromiseError({ code: 404, message: "Not Found" }));
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
        reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
      } else if (row == undefined) {
        reject(new PromiseError({ code: 404, message: "Not Found" }));
      } else {
        let student = {
          studentId: row.studentId,
          name: row.name,
          surname: row.surname,
          gender: row.gender,
          email: row.email,
          codDegree: row.codDegree,
          nationality: row.nationality,
          self: `/api/students/${studentId}`
        };

        const filepath = './uploads/' + studentId + '.pdf';
        
        if (fs.existsSync(filepath)) {
          student = { ...student, cv: `${studentId}.pdf` };
        } else {
          student = { ...student, cv: '' };
        }

        resolve(student);
      }
    });
  });
}

exports.getStudentsByThesisProposalId = function (thesisProposalId) {
  return new Promise(function (resolve, reject) {
    const sql = "SELECT applications.studentId, students.email FROM applications, students WHERE applications.thesisProposalId = ? AND applications.status = 'Pending' AND applications.studentId = students.studentId";

    db.all(sql, [thesisProposalId], (err, rows) => {
      if (err) {
        reject(new InternalError());
      } else if (rows.length == 0) {
        resolve([]);
      } else {
        let students = rows.map((r) => ({ studentId: r.studentId, email: r.email }));

        resolve(students);
      }
    });
  });
}
