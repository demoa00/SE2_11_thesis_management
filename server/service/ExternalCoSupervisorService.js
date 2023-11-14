'use strict';

const sqlite = require('sqlite3');

const db = new sqlite.Database('./database/thesis_management.sqlite', (err) => { if (err) throw err; });


/**
 *
 * authenticatedUserId String The authenticated user id corresponds to the professor that perform this request
 * returns List
 **/
exports.getAllExternalCoSupervisors = function () {
  return new Promise(function (resolve, reject) {
    //to do!
  });
}

