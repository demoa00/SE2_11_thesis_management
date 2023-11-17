'use strict';

const sqlite = require('sqlite3');
const Professor = require('./ProfessorService');
const ExternalCoSupervisor = require('./ExternalCoSupervisorService');

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
exports.getThesisProposals = function (codDegree, filter) {
  let sql_text = '';
  let sql_filter_supervisor = '';
  let sql_filter_internal_cosupervisor = '';
  let sql_filter_external_cosupervisor = '';
  let sql_filter_expirationdate = '';
  let sql_filter_abroad = '';
  let sql_coddegree = '(SELECT thesisProposalId FROM thesisProposal_cds_bridge WHERE cdsId = ?) ';

  let params = [codDegree];

  if (filter != undefined) {
    if (filter.text != undefined) {
      sql_text += `thesisProposalId IN (SELECT thesisProposalId FROM virtualThesisProposals WHERE virtualThesisProposals MATCH '${filter.text}*') `;
    }
    if (filter.supervisor != undefined) {
      if (!(filter.supervisor instanceof Array)) {
        filter.supervisor = [filter.supervisor];
      }

      [...filter.supervisor].forEach((s, i) => {
        if (i == 0) {
          sql_filter_supervisor += '(SELECT thesisProposalId FROM thesisProposals WHERE supervisor = ? ';
          params.push(s);
        } else {
          sql_filter_supervisor += 'OR supervisor = ? ';
          params.push(s);
        }
      });

      sql_filter_supervisor += ') ';
    }
    if (filter.cosupervisor != undefined) {
      const regex = new RegExp("p.*");

      if (!(filter.cosupervisor instanceof Array)) {
        filter.cosupervisor = [filter.cosupervisor];
      }

      let i = 0;
      let j = 0;
      [...filter.cosupervisor].forEach((c) => {
        if (regex.test(c)) {
          if (i == 0) {
            sql_filter_internal_cosupervisor += '(SELECT thesisProposalId FROM thesisProposal_internalCoSupervisor_bridge WHERE internalCoSupervisorId = ? ';
            i = i + 1;
          } else {
            sql_filter_internal_cosupervisor += ' OR internalCoSupervisorId = ? ';
          }

          sql_filter_internal_cosupervisor += ') ';
          params.push(c);
        } else {
          if (j == 0) {
            sql_filter_external_cosupervisor += '(SELECT thesisProposalId FROM thesisProposal_externalCoSupervisor_bridge WHERE externalCoSupervisorId = ? ';
            j = j + 1;
          } else {
            sql_filter_external_cosupervisor += ' OR externalCoSupervisorId = ? ';
          }

          sql_filter_external_cosupervisor += ')';
          params.push(c);
        }
      });
    }
    if (filter.expirationdate != undefined) {
      sql_filter_expirationdate = 'expirationDate < ? ';
      params.push(filter.expirationdate);
    }
    if (filter.abroad != undefined) {
      sql_filter_abroad = 'abroad = ? ';
      params.push(filter.abroad == 'true' ? 1 : 0);
    }
  }

  let sql_1 = '';
  [sql_filter_supervisor, sql_filter_internal_cosupervisor, sql_filter_external_cosupervisor].filter((s) => s != '').forEach((s, i) => {
    if (i == 0) {
      sql_1 += 'thesisProposalId IN (SELECT DISTINCT thesisProposalId FROM thesisProposals WHERE thesisProposalId IN ' + s;
    } else {
      sql_1 += 'OR thesisProposalId IN ' + s;
    }
  });

  if (sql_1 != '') {
    sql_1 += ') ';
  }

  let sql = 'SELECT thesisProposals.thesisProposalId, professors.name, professors.surname, thesisProposals.title, thesisProposals.keywords, thesisProposals.expirationDate FROM thesisProposals, professors WHERE thesisProposalId IN ' + sql_coddegree;
  [sql_1, sql_text, sql_filter_expirationdate, sql_filter_abroad].filter((s) => s != '').forEach((s, i) => {
    sql += 'AND ' + s;
  });

  sql += 'AND supervisor = professorId';

  return new Promise(function (resolve, reject) {
    db.all(sql, params, function (err, rows) {
      if (err) {
        reject({ code: 500, message: "Internal Server Error" });
      } else if (rows.length == 0) {
        reject({ code: 404, message: "Not Found" });
      } else {
        let thesisProposalsList = rows.map((r) => ({
          thesisProposalId: r.thesisProposalId,
          title: r.title,
          name: r.name,
          surname: r.surname,
          keywords: r.keywords.split("/"),
          expirationDate: r.expirationDate,
          self: `/api/thesisproposals/${r.thesisProposalId}`
        }));

        resolve(thesisProposalsList);
      }
    });
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

