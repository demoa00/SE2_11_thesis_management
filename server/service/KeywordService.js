'use strict';

const sqlite = require('sqlite3');

const db = new sqlite.Database('./database/thesis_management.sqlite', (err) => { if (err) throw err; });


exports.getKeywords = function () {
  return new Promise(function (resolve, reject) {
    const sql = "SELECT keywords FROM thesisProposals";

    db.all(sql, [], (err, rows) => {
      if (err) {
        reject({ code: 500, message: "Internal Server Error" });
      } else if (rows.length == 0) {
        reject({ code: 404, message: "Not Found" });
      } else {
        let keywordsList = [];

        rows.map((r) => {
          r.keywords.split("/").forEach((k) => {
            keywordsList.push(k);
          });
        });

        resolve([...new Set(keywordsList)]);
      }
    });
  });
}
