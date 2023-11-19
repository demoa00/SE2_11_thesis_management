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
    //to do!
  });
}

