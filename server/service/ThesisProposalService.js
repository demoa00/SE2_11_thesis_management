'use strict';

const sqlite = require('sqlite3');
const Professor = require('./ProfessorService');
const ExternalCoSupervisor = require('./ExternalCoSupervisorService');
const Degree = require('./DegreeService');

const db = new sqlite.Database('./database/thesis_management.sqlite', (err) => { if (err) throw err; });


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
  [sql_1, sql_text, sql_filter_expirationdate, sql_filter_abroad, 'isArchived = 0 '].filter((s) => s != '').forEach((s, i) => {
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
 * thesisProposalId Integer 
 * returns thesisProposal
 **/
exports.getThesisProposal = function (user, thesisProposalId) {
  let sql = '';
  let params = [];

  if (user.studentId === undefined) {//professor request
    sql = 'SELECT * FROM thesisProposals WHERE thesisProposalId = ? AND supervisor = ? AND isArchived = 0';
    params = [thesisProposalId, user.professorId];
  } else {//student request
    sql = 'SELECT * FROM thesisProposals WHERE thesisProposalId = ? AND thesisProposalId IN (SELECT thesisProposalId FROM thesisProposal_cds_bridge WHERE cdsId = ?) AND isArchived = 0';
    params = [thesisProposalId, user.codDegree];
  }

  return new Promise(function (resolve, reject) {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject({ code: 500, message: "Internal Server Error" });
      } else if (row === undefined) {
        reject({ code: 404, message: "Not Found" });
      } else {
        let thesisProposal = {
          thesisProposalId: row.thesisProposalId,
          title: row.title,
          supervisor: row.supervisor,
          coSupervisor: [],
          keywords: row.keywords.split("/"),
          description: row.description,
          reqirements: row.reqirements,
          thesisType: row.thesisType,
          abroad: row.abroad == 0 ? false : true,
          groups: [],
          expirationDate: row.expirationDate,
          level: row.level,
          CdS: []
        }

        resolve(thesisProposal);
      }
    })
  }).then((thesisProposal) => {
    return new Promise(function (resolve, reject) {
      const sql = 'SELECT name, surname, codGroup FROM professors WHERE professorId = ?';

      db.get(sql, [thesisProposal.supervisor], (err, row) => {
        if (err) {
          reject({ code: 500, message: "Internal Server Error" });
        } else if (row === undefined) {
          reject({ code: 404, message: "Not Found" });
        } else {
          let professor = {
            professorId: thesisProposal.supervisor,
            name: row.name,
            surname: row.surname,
            professor: `/api/professors/${thesisProposal.supervisor}`
          }

          resolve({ ...thesisProposal, supervisor: professor, groups: [...thesisProposal.groups, row.codGroup] });
        }
      });
    });
  }).then((thesisProposal) => {
    return new Promise(function (resolve, reject) {
      const sql = 'SELECT internalCoSupervisorId, name, surname, codGroup FROM thesisProposal_internalCoSupervisor_bridge, professors WHERE thesisProposalId = ? AND internalCoSupervisorId = professorId';

      db.all(sql, [thesisProposal.thesisProposalId], (err, rows) => {
        if (err) {
          reject({ code: 500, message: "Internal Server Error" });
        } else if (rows.length == 0) {
          resolve(thesisProposal);
        } else {
          let groups = [];
          let coSupervisors = rows.map((r) => {
            groups.push(r.codGroup);

            return {
              coSupervisorId: r.internalCoSupervisorId,
              name: r.name,
              surname: r.surname,
              coSupervisor: `/api/professors/${r.internalCoSupervisorId}`
            };
          });

          groups.forEach((g) => {
            if (!thesisProposal.groups.find((e) => e === g)) {
              thesisProposal.groups.push(g);
            }
          });

          coSupervisors.forEach((c) => thesisProposal.coSupervisor.push(c));

          resolve({ ...thesisProposal });
        }
      });
    });
  }).then((thesisProposal) => {
    return new Promise(function (resolve, reject) {
      const sql = 'SELECT externalCoSupervisors.externalCoSupervisorId, name, surname FROM thesisProposal_externalCoSupervisor_bridge, externalCoSupervisors WHERE thesisProposalId = ? AND thesisProposal_externalCoSupervisor_bridge.externalCoSupervisorId = externalCoSupervisors.externalCoSupervisorId';

      db.all(sql, [thesisProposal.thesisProposalId], (err, rows) => {
        if (err) {
          reject({ code: 500, message: "Internal Server Error" });
        } else if (rows.length == 0) {
          resolve(thesisProposal);
        } else {
          let coSupervisors = rows.map((r) => ({
            coSupervisorId: r.externalCoSupervisorId,
            name: r.name,
            surname: r.surname,
            coSupervisor: `/api/externalCoSupervisors/${r.externalCoSupervisorId}`
          }));

          coSupervisors.forEach((c) => thesisProposal.coSupervisor.push(c));

          resolve({ ...thesisProposal });
        }
      });
    });
  }).then((thesisProposal) => {
    return new Promise(function (resolve, reject) {
      const sql = 'SELECT cdsId, titleDegree FROM thesisProposal_cds_bridge, degrees WHERE thesisProposalId = ? AND cdsId = degreeId';

      db.all(sql, [thesisProposal.thesisProposalId], (err, rows) => {
        if (err) {
          reject({ code: 500, message: "Internal Server Error" });
        } else if (rows.length == 0) {
          reject({ code: 404, message: "Not Found" });
        } else {
          let cds = rows.map((r) => ({ degreeId: r.cdsId, titleDegree: r.titleDegree }));

          resolve({ ...thesisProposal, CdS: cds });
        }
      });
    })
  });
}


/**
 *
 * authenticatedUserId String The authenticated user id corresponds to the professor that perform this request
 * professorId String 
 * returns thesisProposals
 **/
exports.getThesisProposalsOfProfessor = function (professorId, filter) {
<<<<<<< HEAD
  if (filter instanceof Array) {
    filter = filter[0];
  }

  return new Promise(function (resolve, reject) {
    let sql = 'SELECT * FROM thesisProposals WHERE ';
    let params = [];
=======
  let sql = 'SELECT * FROM thesisProposals WHERE supervisor = ?' + ' OR ' + 'thesisProposalId IN (SELECT thesisProposalId FROM thesisProposal_internalCosupervisor_bridge WHERE internalCoSupervisorId = ?) AND isArchived = 0';
>>>>>>> 6d6fe259ba17739a6af88678b95fe7d91d10067d

  let params = [];
  params.push(professorId);
  params.push(professorId);

  if (filter != undefined) {
    if (filter instanceof Array) {
      filter = filter[0];
    }

    if (filter === 'supervisor') {
      sql = 'SELECT * FROM thesisProposals WHERE supervisor = ? AND isArchived = 0';
      params = [professorId];
    } else if (filter === 'cosupervisor') {
      sql += 'SELECT * FROM thesisProposals WHERE thesisProposalId IN (SELECT thesisProposalId FROM thesisProposal_internalCosupervisor_bridge WHERE internalCoSupervisorId = ?) AND isArchived = 0';
      params = [professorId];
    }
  }

  return new Promise(function (resolve, reject) {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject({ code: 500, message: "Internal Server Error" });
      } else if (rows.length == 0) {
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
<<<<<<< HEAD
 * thesisProposalId Integer 
 * returns thesisProposal
 **/
exports.getThesisProposal = function (thesisProposalId) {
  return new Promise(function (resolve, reject) {
    const sql = 'SELECT * FROM thesisProposals WHERE thesisProposalId = ? ';
    db.get(sql, [thesisProposalId], function (err, row) {
      if (err) {
        reject({ code: 500, message: "Internal Server Error" });
      }
      if (row == undefined) {
        reject({ code: 404, message: "Not Found" });
      }
      let thesis = { ...row, self: `/api/thesisProposals/${thesisProposalId}` }
      resolve(thesis);
    })
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
  // to do!
  })
}

/**
 *
=======
>>>>>>> 6d6fe259ba17739a6af88678b95fe7d91d10067d
 * body ThesisProposal  (optional)
 * professorId String 
 * authenticatedUserId String The authenticated user id corresponds to the professor that perform this request
 * returns thesisProposal
 **/
exports.insertNewThesisProposal = function (professorId, newThesisProposal) {
  let promise = [];
  let internalCosupervisor = [];
  let externalCosupervisor = [];
  let degree = [];

  if (newThesisProposal.coSupervisor != undefined) {
    let regex = new RegExp("(p|P)[0-9]{6}");

    newThesisProposal.coSupervisor.forEach((c) => {
      if (regex.test(c.coSupervisorId)) {//internal co-supervisor
        promise.push(Professor.getProfessorById(c.coSupervisorId));
        internalCosupervisor.push(c.coSupervisorId);
      } else {//external co-supervisor
        promise.push(ExternalCoSupervisor.getExternalCoSupervisorById(c.coSupervisorId));
        externalCosupervisor.push(c.coSupervisorId);
      }
    });
  }

  newThesisProposal.CdS.forEach((c) => {
    promise.push(Degree.getDegreeById(c.degreeId));
    degree.push(c.degreeId);
  });

  return Promise.all(promise).then(() => {
    return new Promise(function (resolve, reject) {
      const sql = 'INSERT INTO thesisProposals(title, supervisor, keywords, description, requirements, thesisType, abroad, notes, expirationDate, level, isArchived) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
      db.run(sql, [newThesisProposal.title,
        professorId,
      JSON.stringify(newThesisProposal.keywords),
      newThesisProposal.description,
      newThesisProposal.requirements,
      newThesisProposal.thesisType,
      newThesisProposal.abroad,
      newThesisProposal.notes,
      newThesisProposal.expirationDate,
      newThesisProposal.level,
<<<<<<< HEAD
      false
    ], function (err) {
      if (err) {
        reject({ code: 500, message: "Internal Server Error" });
      }
      let newThesis = { ...newThesisProposal, thesisProposalId: this.lastID, self: `/api/professors/${professorId}/thesisProposals/${this.lastID}` }
      resolve(newThesis);
    })
=======
        false
      ], function (err) {
        if (err) {
          reject({ code: 500, message: "Internal Server Error" });
        } else {
          resolve(this.lastID);
        }
      });
    }).then((lastID) => {
      return new Promise(function (resolve, reject) {
        if (internalCosupervisor.length == 0) {
          resolve(lastID);
        } else {
          let sql = 'INSERT INTO thesisProposal_internalCoSupervisor_bridge (thesisProposalId, internalCoSupervisorId) VALUES ';
          let params = [];

          internalCosupervisor.forEach((c, i) => {
            if (i == 0) {
              sql += '(?, ?)';
            } else {
              sql += ', (?, ?)';
            }

            params.push(lastID);
            params.push(c);
          });

          db.run(sql, params, function (err, row) {
            if (err) {
              reject({ code: 500, message: "Internal Server Error" });
            } else {
              resolve(lastID);
            }
          });
        }
      })
    }).then((lastID) => {
      return new Promise(function (resolve, reject) {
        if (externalCosupervisor.length == 0) {
          resolve(lastID);
        } else {
          let sql = 'INSERT INTO thesisProposal_externalCoSupervisor_bridge (thesisProposalId, externalCoSupervisorId) VALUES ';
          let params = [];

          externalCosupervisor.forEach((c, i) => {
            if (i == 0) {
              sql += '(?, ?)';
            } else {
              sql += ', (?, ?)';
            }

            params.push(lastID);
            params.push(c);
          });

          db.run(sql, params, function (err, row) {
            if (err) {
              reject({ code: 500, message: "Internal Server Error" });
            } else {
              resolve(lastID);
            }
          });
        }
      });
    }).then((lastID) => {
      return new Promise(function (resolve, reject) {
        if (degree.length == 0) {
          reject({ code: 500, message: "internal Server Error" });
        } else {
          let sql = 'INSERT INTO thesisProposal_cds_bridge (thesisProposalId, cdsId) VALUES ';
          let params = [];

          degree.forEach((c, i) => {
            if (i == 0) {
              sql += '(?, ?)';
            } else {
              sql += ', (?, ?)';
            }

            params.push(lastID);
            params.push(c);
          });

          db.run(sql, params, function (err, row) {
            if (err) {
              reject({ code: 500, message: "Internal Server Error" });
            } else {
              resolve({ newThesisProposal: `/api/thesisProposals/${lastID}` });
            }
          });
        }
      });
    });
>>>>>>> 6d6fe259ba17739a6af88678b95fe7d91d10067d
  });
}

