'use strict';

const sqlite = require('sqlite3');

const db = new sqlite.Database('./database/thesis_management.sqlite', (err) => { if (err) throw err; });


/**
 *
 * professorId String 
 * returns professor
 **/
exports.getProfessorById = function (professorId) {
  return new Promise(function (resolve, reject) {
    //to do!
  });
}


/**
 *
 * returns professors
 **/
exports.getProfessors = function () {
  return new Promise(function (resolve, reject) {
    //to do!
  });
}

