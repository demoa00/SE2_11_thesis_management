'use strict';

const sqlite = require('sqlite3');

const db = new sqlite.Database('./database/thesis_management.sqlite', (err) => { if (err) throw err; });


exports.getDegrees = function () {
  return new Promise(function (resolve, reject) {
    const sql = 'SELECT * FROM degrees';

    db.all(sql, [], (err, rows) => {
      if (err) {
        reject({ code: 500, message: "Internal Server Error" });
      } else if (rows.length == 0) {
        reject({ code: 404, message: "Not Found" });
      } else {
        let degreesList = rows.map((r) => ({ degreeId: r.degreeId, titleDegree: r.titleDegree }));

        resolve(degreesList.sort((a, b) => a.titleDegree.localeCompare(b.titleDegree)));
      }
    })
  });
}

exports.getDegreeById = function (degreeId) {
  return new Promise(function (resolve, reject) {
    const sql = 'SELECT * FROM degrees WHERE degreeId = ?';

    db.get(sql, [degreeId], (err, row) => {
      if (err) {
        reject({ code: 500, message: "Internal Server Error" });
      } else if (row == undefined) {
        reject({ code: 404, message: "Not Found" });
      } else {
        let degree = {
          degreeId: row.degreeId,
          titleDegree: row.titleDegree
        };

        resolve(degree);
      }
    });
  })
}
