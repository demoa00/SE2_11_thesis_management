'use strict';

const sqlite = require('sqlite3');

const dayjs = require("dayjs");
const db = new sqlite.Database('./database/thesis_management.sqlite', (err) => { if (err) throw err; });


/**
 *
 * authenticatedUserId String The authenticated user id corresponds to the student that perform this request
 * studentId String 
 * returns applications
 **/
exports.getAllApplicationsOfStudent = function (studentId) {
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


/**
 *
 * authenticatedUserId String The authenticated user id corresponds to the professor that perform this request
 * applicationId Integer 
 * returns application
 **/
exports.getApplication = function (applicationId) {
  return new Promise(function (resolve, reject) {
    const sql = 'SELECT students.studentId, students.name, students.surname, thesis.title, applications.message, applications.date, applications.isAccepted FROM applications, students, (SELECT thesisProposalId, title FROM thesisProposals WHERE thesisProposalId = ?) AS thesis WHERE applications.studentId = students.studentsId AND applications.thesisProposalId = thesis.thesisProposalId';
    db.get(sql, params, function (err, row) {
      
    })
  });
}


/**
 *
 * authenticatedUserId String The authenticated user id corresponds to the professor that perform this request
 * returns applications
 **/
exports.getApplications = function (professorId) {
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


/**
 *
 * body Application  (optional)
 * studentId String 
 * authenticatedUserId String The authenticated user id corresponds to the student that perform this request
 * returns application
 **/
exports.insertNewApplication = function (studentId, newApplication) {
  return new Promise(function (resolve, reject) {
    const sql = "INSERT INTO applications(?, ?, ?, ?, ?, ?, ?) VALUES (thesisProposalId, studentId, message, date, isReadedByProfessor, isReadedByStudent, isAccepted)";
    db.run(sql, [newApplication.thesisProposalId, studentId, newApplication.message, dayjs().format('YYYY-MM-DD'), 0, 0, 'Pending'], function (err) {
      if (err) {
        reject({ code: 500, message: "Internal Server Error" });
      } else {
        resolve({ newApplication: `/student/${studentId}/applications/${lastID}` });
      }
    })
  });
}

