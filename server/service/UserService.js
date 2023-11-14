'use strict';

const sqlite = require('sqlite3');
const crypto = require('crypto');

const db = new sqlite.Database('./database/thesis_management.sqlite', (err) => { if (err) throw err; });

/**
 *
 * body AuthenticatedSession_body  (optional)
 * returns student
 **/
exports.createNewAuthenticatedSession = function (username, password) {
  return new Promise(function (resolve, reject) {
    const sql = 'SELECT * FROM users WHERE users.email = ?';

    db.get(sql, [username], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve(false);
      } else {
        const salt = row.salt;

        crypto.scrypt(password, salt, 64, (err, hashedPassword) => {
          if (err) {
            reject(err);
          }

          const passwordHex = Buffer.from(row.password, 'hex');

          if (!crypto.timingSafeEqual(passwordHex, hashedPassword)) {
            resolve(false);
          } else {
            resolve({ email: row.email, isStudent: row.isStudent });
          }
        });
      }
    })
  });
}


/**
 *
 * authenticatedUserId String The authenticated user id corresponds to the professor or student that perform this request
 * userId String The authenticated user id corresponds to the professor or student that perform this request
 * no response value expected for this operation
 **/
exports.deleteAuthenticatedSession = function (authenticatedUserId, userId) {
  return new Promise(function (resolve, reject) {
    //to do
  });
}


exports.getUserData = function (user) {
  return new Promise(function (resolve, reject) {
    let sql;
    if (user.isStudent) {
      sql = 'SELECT * FROM students WHERE email = ?';
    } else {
      sql = 'SELECT * FROM professors WHERE email = ?';
    }

    db.get(sql, [user.email], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve(false);
      } else {
        let authenticatedUser;
        if (user.isStudent) {
          authenticatedUser = {
            studentId: row.studentId,
            email: row.email,
            codDegree: row.codDegree,
            isStudent: true
          };
        } else {
          authenticatedUser = {
            professorId: row.professorId,
            email: row.email,
            codGroup: row.codGroup,
            isStudent: false
          };
        }

        resolve(authenticatedUser);
      }
    });
  });
}