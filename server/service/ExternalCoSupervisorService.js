'use strict';

const sqlite = require('sqlite3');

const db = new sqlite.Database('./database/thesis_management.sqlite', (err) => { if (err) throw err; });


/**
 *
 * authenticatedUserId String The authenticated user id corresponds to the professor that perform this request
 * returns List
 **/
exports.getExternalCoSupervisors = function () {
  return new Promise(function (resolve, reject) {
    const sql = 'SELECT * FROM externalCoSupervisors';

    db.all(sql, [], (err, rows) => {
      if (err) {
        reject({ code: 500, message: "Internal Server Error" });
      } else {
        let externalCoSupervisorsList = rows.map((r) => ({
          externalCoSupervisorId: r.externalCoSupervisorId,
          name: r.name,
          surname: r.surname,
          self: `/api/externalCoSupervisors/${r.externalCoSupervisorId}`
        }));

        resolve(externalCoSupervisorsList);
      }
    });
  });
}

/**
 *
 * authenticatedUserId String The authenticated user id corresponds to the professor that perform this request
 * externalCoSupervisorId String 
 * returns externalCoSupervisor
 **/
exports.getExternalCoSupervisorById = function (externalCoSupervisorId) {
  return new Promise(function (resolve, reject) {
    const sql = 'SELECT * FROM externalCoSupervisors WHERE externalCoSupervisorId = ?';

    db.get(sql, [externalCoSupervisorId], (err, row) => {
      if (err) {
        reject({ code: 500, message: "Internal Server Error" });
      } else if (row === undefined) {
        reject({ code: 404, message: "Not Found" });
      } else {
        let externalCoSupervisor = {
          externalCoSupervisorId: row.externalCoSupervisorId,
          name: row.name,
          surname: row.surname,
          email: row.email,
          company: row.company,
          self: `/api/externalCoSupervisors/${row.externalCoSupervisorId}`
        };

        resolve(externalCoSupervisor);
      }
    });
  });
}