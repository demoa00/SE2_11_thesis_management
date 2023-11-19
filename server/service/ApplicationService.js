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
    //to do!
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
    //to do!
  });
}


/**
 *
 * authenticatedUserId String The authenticated user id corresponds to the professor that perform this request
 * returns applications
 **/
exports.getApplications = function (professorId) {
  return new Promise(function (resolve, reject) {
    //to do!
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
    const sql = "INSERT INTO applications(?, ?, ?, ?, ?, ?) VALUES (applicant, message, date, isReadedByProfessor, isReadedByStudent, isAccepted)";
    db.run(sql, [studentId, newApplication.message, dayjs().format('YYYY-MM-DD'), 0, 0, 'Pending'], function (err) {
      if (err) {
        reject({ code: 500, message: "Internal Server Error" });
      } else {
        resolve({ newApplication: `/student/${studentId}/applications/${lastID}` });
      }
    })
  });
}

