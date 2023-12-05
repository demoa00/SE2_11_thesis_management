'use strict';

const db = require('../utils/dbConnection');


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
          JSON.parse(r.keywords).forEach((k) => {
            keywordsList.push(k);
          });
        });

        let set = [...new Set(keywordsList)];
        resolve(set.sort((a, b) => a.localeCompare(b)));
      }
    });
  });
}
