'use strict';

const sqlite = require('sqlite3');

const db = new sqlite.Database('./database/thesis_management.sqlite', (err) => { if (err) throw err; });


/**
 *
 * authenticatedUserId String The authenticated user id corresponds to the professor that perform this request
 * professorId String 
 * returns thesisProposals
 **/
exports.getThesisProposalsOfProfessor = function (professorId, filter) {
  if (filter instanceof Array) {
    filter = filter[0];
  }
  
  return new Promise(function (resolve, reject) {
    let sql = 'SELECT * FROM thesisProposals WHERE ';
    let params = [];

    if (filter != undefined) {
      if (filter === 'supervisor') {
        sql = sql + 'supervisor = ?';
        params.push(professorId);
      } else if (filter === 'cosupervisor') {
        sql = sql + 'thesisProposalId IN (SELECT thesisProposalId FROM thesisProposal_internalCosupervisor_bridge WHERE internalCoSupervisorId = ?)';
        params.push(professorId);
      }
    } else {
      sql = sql + 'supervisor = ?' + ' OR ' + 'thesisProposalId IN (SELECT thesisProposalId FROM thesisProposal_internalCosupervisor_bridge WHERE internalCoSupervisorId = ?)';
      params.push(professorId);
      params.push(professorId);
    }

    db.all(sql, params, (err, rows) => {
      if (err) {
        reject({ code: 500, message: "Internal Server Error" });
      } else if (rows === undefined) {
        reject({ code: 404, message: "Not Found" });
      } else {
        let thesisProposalsList = rows.map((r) => ({
          thesisProposalId: r.thesisProposalId,
          title: r.title,
          keywords: r.keywords.split("/"),
          self: `/api/professors/${professorId}/thesisProposals/${r.thesisProposalId}`
        }));

        resolve(thesisProposalsList);
      }
    });
  });
}


/**
 *
 * thesisProposalId Integer 
 * returns thesisProposal
 **/
exports.getThesisProposal = function (thesisProposalId) {
  return new Promise(function (resolve, reject) {
    //to do!
  });
}


/**
 *
 * codDegree String The codDegree is about the degree that the student, that perform this request, attends
 * keywords List  (optional)
 * supervisor String  (optional)
 * title String  (optional)
 * inCompany Boolean  (optional)
 * abroad Boolean  (optional)
 * expirationDate date  (optional)
 * returns thesisProposals
 **/
exports.getThesisProposals = function (codDegree, keywords, supervisor, title, inCompany, abroad, expirationDate) {
  return new Promise(function (resolve, reject) {
    const sql = 'SELECT thesisProposalId FROM thesisProposal_cds_bridge WHERE cdsId = ?';
    db.all(sql, [codDegree], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const thesisProposals = rows.map((e) => ({
        thesis: e.thesis
      }
      ));
      resolve(thesisProposals);
    }).then(function () {
      return new Promise(function (resolve, reject) {
        const sql = 'SELECT * FROM thesisProposals WHERE ';
        db.all(sql, [], (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
          const thesisProposals = rows.map((e) => ({
            thesis: e.thesis
          }
          ));
          resolve(thesisProposals);
        })
      })
    })
  });
}


/**
 *
 * body ThesisProposal  (optional)
 * professorId String 
 * authenticatedUserId String The authenticated user id corresponds to the professor that perform this request
 * returns thesisProposal
 **/
exports.insertNewThesisProposal = function (professorId, newThesisProposal) {
  return new Promise(function (resolve, reject) {
    const sql = 'INSERT INTO thesisProposals(title, supervisor, keywords, description, requirements, thesisType, abroad, notes, expirationDate, level, isArchieved) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    db.run(sql, [
      newThesisProposal.title,
      professorId,
      newThesisProposal.keywords,
      newThesisProposal.description,
      newThesisProposal.reqirements,
      newThesisProposal.thesisType,
      newThesisProposal.abroad,
      newThesisProposal.notes,
      newThesisProposal.expirationDate,
      newThesisProposal.level,
      0
    ], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    })
  });
}

