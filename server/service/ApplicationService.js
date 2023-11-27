'use strict';

const sqlite = require('sqlite3');
const dayjs = require('dayjs');

const db = new sqlite.Database('./database/thesis_management.sqlite', (err) => { if (err) throw err; });


exports.getAllApplicationsForStudent = function (studentId) {
  return new Promise(function (resolve, reject) {
    const sql = 'SELECT applications.thesisProposalId, thesis.title, applications.studentId, applications.date FROM applications, (SELECT thesisProposalId, title FROM thesisProposals) AS thesis WHERE applications.thesisProposalId = thesis.thesisProposalId AND applications.studentId = ?';

    db.all(sql, [studentId], (err, rows) => {
      if (err) {
        reject({ code: 500, message: "Internal Server Error" });
      } else if (rows.length == 0) {
        reject({ code: 404, message: "Not Found" });
      } else {
        let applicationsList = rows.map((r) => ({
          thesisProposalId: r.thesisProposalId,
          thesisProposalTitle: r.title,
          studentId: r.studentId,
          date: r.date
        }));

        resolve(applicationsList);
      }
    });
  });
}

exports.getApplicationsForProfessor = function (professorId) {
  return new Promise(function (resolve, reject) {
    const sql = 'SELECT applications.thesisProposalId, thesis.title, applications.studentId, applications.date FROM applications, (SELECT thesisProposalId, title FROM thesisProposals WHERE supervisor = ?) AS thesis WHERE applications.thesisProposalId = thesis.thesisProposalId';

    db.all(sql, [professorId], (err, rows) => {
      if (err) {
        reject({ code: 500, message: "Internal Server Error" });
      } else if (rows.length == 0) {
        reject({ code: 404, message: "Not Found" });
      } else {
        let applicationsList = rows.map((r) => ({
          thesisProposalId: r.thesisProposalId,
          thesisProposalTitle: r.title,
          studentId: r.studentId,
          date: r.date
        }));

        resolve(applicationsList);
      }
    });
  });
}

exports.getApplicationById = function (user, studentId, thesisProposalId) {
  let sql = '';
  let params = [];

  if (user.role === 'professor') {//professor request
    sql = 'SELECT applications.thesisProposalId, students.studentId, students.name, students.surname, thesis.title, applications.message, applications.date, applications.status FROM applications, students, (SELECT thesisProposalId, title FROM thesisProposals WHERE thesisProposalId = ? AND supervisor = ?) AS thesis WHERE applications.studentId = ? AND applications.thesisProposalId = ? AND applications.studentId = students.studentId AND applications.thesisProposalId = thesis.thesisProposalId';
    params = [thesisProposalId, user.userId, studentId, thesisProposalId];
  } else {//student request
    sql = 'SELECT applications.thesisProposalId, students.studentId, students.name, students.surname, thesis.title, applications.message, applications.date, applications.status FROM applications, students, (SELECT thesisProposalId, title FROM thesisProposals WHERE thesisProposalId = ?) AS thesis WHERE applications.studentId = ? AND applications.thesisProposalId = ? AND applications.studentId = students.studentId AND applications.thesisProposalId = thesis.thesisProposalId';
    params = [thesisProposalId, user.userId, thesisProposalId];
  }

  return new Promise(function (resolve, reject) {
    db.get(sql, params, function (err, row) {
      if (err) {
        console.log(err)
        reject({ code: 500, message: "Internal Server Error" });
      } else if (row === undefined) {
        reject({ code: 404, message: "Not Found" });
      } else {
        let application = {
          thesisProposalId: thesisProposalId,
          title: row.title,
          applicant: { studentId: row.studentId, name: row.name, surname: row.surname, student: `/api/students/${row.studentId}` },
          message: row.message,
          date: row.date,
          status: row.status,
        }
        resolve(application);
      }
    })
  });
}

exports.updateApplication = function (professorId, studentId, thesisProposalId, newApplication) {
  return new Promise(function (resolve, reject) {
    const sql = 'UPDATE applications SET status = ? WHERE thesisProposalId = ? AND studentId = ? AND thesisProposalId IN (SELECT thesisProposalId FROM thesisProposals WHERE supervisor = ?)';

    db.run(sql, [newApplication.status, thesisProposalId, studentId, professorId], function (err) {
      if (err) {
        reject({ code: 500, message: "Internal Server Error" });
      } else if (this.changes == 0) {
        reject({ code: 404, message: "Not Found" });
      } else {
        resolve({ newApplication: `/api/applications/${newApplication.thesisProposalId}/${studentId}` })
      }
    });
  });
}

exports.insertNewApplication = function (studentId, newApplication) {
  return new Promise(function (resolve, reject) {
    const sql = 'INSERT INTO applications(thesisProposalId, studentId, message, date) VALUES (?, ?, ?, ?)';
    db.run(sql, [newApplication.thesisProposalId, studentId, newApplication.message, dayjs().format('YYYY-MM-DD')], function (err) {
      if (err) {
        reject({ code: 500, message: "Internal Server Error" });
      } else {
        resolve({ newApplication: `/api/applications/${newApplication.thesisProposalId}/${studentId}` });
      }
    });
  });
}
