'use strict';

const dayjs = require('dayjs');

const Professor = require('./ProfessorService');
const Student = require('./StudentService');
const ExternalCoSupervisor = require('./ExternalCoSupervisorService');
const Degree = require('./DegreeService');
const Notification = require('./NotificationService');
const checkRole = require('../utils/checkRole');
const smtp = require('../utils/smtp');
const { PromiseError, InternalError } = require('../utils/error');

const db = require('../utils/dbConnection');


exports.getThesisProposalsForStudent = function (codDegree, filter) {
  let sql_text = '';
  let sql_filter_supervisor = '';
  let sql_filter_internal_cosupervisor = '';
  let sql_filter_external_cosupervisor = '';
  let sql_filter_expirationdate = '';
  let sql_filter_abroad = '';
  let sql_coddegree = '(SELECT thesisProposalId FROM thesisProposal_cds_bridge WHERE cdsId = ?) ';

  let params = [codDegree];

  if (filter?.text) {
    filter.text = filter.text instanceof Array ? filter.text[0] : filter.text;

    sql_text += `thesisProposalId IN (SELECT thesisProposalId FROM virtualThesisProposals WHERE virtualThesisProposals MATCH '${filter.text}*') `;
  }
  if (filter?.supervisor) {
    filter.supervisor = filter.supervisor instanceof Array ? filter.supervisor : [filter.supervisor];

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
  if (filter?.cosupervisor) {
    const regex = new RegExp("p.*");
    let i = 0;
    let j = 0;
    let internal_params = [];
    let external_params = [];

    filter.cosupervisor = filter.cosupervisor instanceof Array ? filter.cosupervisor : [filter.cosupervisor];

    [...filter.cosupervisor].forEach((c) => {
      if (regex.test(c)) {
        if (i == 0) {
          sql_filter_internal_cosupervisor += '(SELECT thesisProposalId FROM thesisProposal_internalCoSupervisor_bridge WHERE internalCoSupervisorId = ? ';
          i = i + 1;
        } else {
          sql_filter_internal_cosupervisor += ' OR internalCoSupervisorId = ? ';
        }

        internal_params.push(c);
      } else {
        if (j == 0) {
          sql_filter_external_cosupervisor += '(SELECT thesisProposalId FROM thesisProposal_externalCoSupervisor_bridge WHERE externalCoSupervisorId = ? ';
          j = j + 1;
        } else {
          sql_filter_external_cosupervisor += ' OR externalCoSupervisorId = ? ';
        }

        external_params.push(c);
      }
    });

    if (sql_filter_internal_cosupervisor != '') {
      sql_filter_internal_cosupervisor += ') ';
    }
    if (sql_filter_external_cosupervisor != '') {
      sql_filter_external_cosupervisor += ')';
    }

    params = [...params, internal_params, external_params].flat(Infinity);
  }
  if (filter?.expirationdate) {
    filter.expirationdate = filter.expirationdate instanceof Array ? filter.expirationdate[0] : filter.expirationdate;

    sql_filter_expirationdate = 'expirationDate < ? ';
    params.push(dayjs(filter.expirationdate).format('YYYY-MM-DD'));
  }
  if (filter?.abroad) {
    filter.abroad = filter.abroad instanceof Array ? filter.abroad[0] : filter.abroad;

    sql_filter_abroad = 'abroad = ? ';
    params.push(filter.abroad == 'true' ? 1 : 0);
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
  [sql_1, sql_text, sql_filter_expirationdate, sql_filter_abroad, 'isArchieved = 0 '].filter((s) => s != '').forEach((s) => {
    sql += 'AND ' + s;
  });

  sql += 'AND supervisor = professorId';

  return new Promise(function (resolve, reject) {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
      } else if (rows.length == 0) {
        resolve([]);
      } else {
        let thesisProposalsList = rows.map((r) => ({
          thesisProposalId: r.thesisProposalId,
          title: r.title,
          name: r.name,
          surname: r.surname,
          keywords: JSON.parse(r.keywords),
          expirationDate: r.expirationDate,
          self: `/api/thesisproposals/${r.thesisProposalId}`
        }));

        resolve(thesisProposalsList);
      }
    });
  });
}

exports.getThesisProposalsForProfessor = function (professorId, filter) {
  let sql = 'SELECT thesisProposals.thesisProposalId, thesisProposals.title, p.name, p.surname, thesisProposals.keywords, thesisProposals.expirationDate FROM thesisProposals, (SELECT professorId, name, surname FROM professors) p WHERE supervisor = ?' + ' OR ' + 'thesisProposalId IN (SELECT thesisProposalId FROM thesisProposal_internalCosupervisor_bridge WHERE internalCoSupervisorId = ?) AND supervisor = p.professorId AND isArchieved = 0';

  let params = [];
  params.push(professorId);
  params.push(professorId);

  if (filter?.cosupervisor) {
    filter.cosupervisor = filter.cosupervisor instanceof Array ? filter.cosupervisor[0] : filter.cosupervisor;

    if (filter.cosupervisor === 'false') {
      sql = 'SELECT thesisProposals.thesisProposalId, thesisProposals.title, p.name, p.surname, thesisProposals.keywords, thesisProposals.expirationDate FROM thesisProposals, (SELECT professorId, name, surname FROM professors WHERE professorId = ?) p WHERE supervisor = ? AND supervisor = p.professorId ';
      params = [professorId, professorId];
    } else if (filter.cosupervisor === 'true') {
      sql = 'SELECT thesisProposals.thesisProposalId, thesisProposals.title, p.name, p.surname, thesisProposals.keywords, thesisProposals.expirationDate FROM thesisProposals, (SELECT professorId, name, surname FROM professors) p WHERE thesisProposalId IN (SELECT thesisProposalId FROM thesisProposal_internalCosupervisor_bridge WHERE internalCoSupervisorId = ?) AND supervisor = p.professorId ';
      params = [professorId];
    }
  }

  if (filter?.isArchieved) {
    filter.isArchieved = filter.isArchieved instanceof Array ? filter.isArchieved[0] : filter.isArchieved;

    if (filter.isArchieved === 'true') {
      sql += ' AND isArchieved = 1';
    } else if (filter.isArchieved === 'false') {
      sql += ' AND isArchieved = 0';
    }
  }

  return new Promise(function (resolve, reject) {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
      } else if (rows.length == 0) {
        reject(new PromiseError({ code: 404, message: "Not Found" }));
      } else {
        let thesisProposalsList = rows.map((r) => ({
          thesisProposalId: r.thesisProposalId,
          title: r.title,
          name: r.name,
          surname: r.surname,
          keywords: JSON.parse(r.keywords),
          expirationDate: r.expirationDate,
          self: `/api/thesisProposals/${r.thesisProposalId}`
        }));

        resolve(thesisProposalsList);
      }
    });
  });
}

exports.getThesisProposalById = function (user, thesisProposalId) {
  let sql = '';
  let params = [];

  if (checkRole.isProfessor(user)) {//professor request -- both active and archived thesis proposals
    sql = 'SELECT * FROM thesisProposals WHERE thesisProposalId = ? AND (supervisor = ? OR thesisProposalId IN (SELECT DISTINCT thesisProposalId FROM thesisProposal_internalCoSupervisor_bridge WHERE internalCoSupervisorId = ?))';
    params = [thesisProposalId, user.userId, user.userId];
  } else if (checkRole.isStudent(user)) {//student request -- only active thesis proposals
    sql = 'SELECT * FROM thesisProposals WHERE thesisProposalId = ? AND thesisProposalId IN (SELECT thesisProposalId FROM thesisProposal_cds_bridge WHERE cdsId = ?) AND isArchieved = 0';
    params = [thesisProposalId, user.codDegree];
  }

  return new Promise(function (resolve, reject) {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
      } else if (row === undefined) {
        reject(new PromiseError({ code: 404, message: "Not Found" }));
      } else {
        let thesisProposal = {
          thesisProposalId: row.thesisProposalId,
          title: row.title,
          supervisor: row.supervisor,
          coSupervisor: [],
          keywords: JSON.parse(row.keywords),
          description: row.description,
          requirements: row.requirements,
          note: row.note,
          thesisType: row.thesisType,
          abroad: row.abroad == 0 ? false : true,
          groups: [],
          expirationDate: row.expirationDate,
          level: row.level,
          CdS: [],
          self: `/api/thesisProposals/${row.thesisProposalId}`
        }

        resolve(thesisProposal);
      }
    })
  }).then((thesisProposal) => {
    return new Promise(function (resolve, reject) {
      const sql = 'SELECT name, surname, codGroup FROM professors WHERE professorId = ?';

      db.get(sql, [thesisProposal.supervisor], (err, row) => {
        if (err) {
          reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
        } else if (row === undefined) {
          reject(new PromiseError({ code: 404, message: "Not Found" }));
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
          reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
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
          reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
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
          reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
        } else if (rows.length == 0) {
          reject(new PromiseError({ code: 404, message: "Not Found" }));
        } else {
          let cds = rows.map((r) => ({ degreeId: r.cdsId, titleDegree: r.titleDegree }));

          resolve({ ...thesisProposal, CdS: cds });
        }
      });
    })
  });
}

exports.insertNewThesisProposal = async function (professorId, newThesisProposal) {
  let promises = [];
  let internalCosupervisors = [];
  let externalCosupervisors = [];
  let degree = [];

  let regex = new RegExp("(p|P)[0-9]{6}");

  if (dayjs(newThesisProposal.expirationDate).diff() <= 0) {
    throw new PromiseError({ code: 400, message: "Bad Request" });
  }

  if (newThesisProposal?.coSupervisor) {
    for (let c of newThesisProposal.coSupervisor) {
      try {
        if (regex.test(c.coSupervisorId)) {
          let internalCoSupervisor = await Professor.getProfessorById(c.coSupervisorId);

          internalCosupervisors.push({ coSupervisorId: internalCoSupervisor.professorId, email: internalCoSupervisor.email });
        } else {
          let externalCoSupervisor = await ExternalCoSupervisor.getExternalCoSupervisorById(c.coSupervisorId);

          externalCosupervisors.push({ coSupervisorId: externalCoSupervisor.externalCoSupervisorId, email: externalCoSupervisor.email });
        }
      } catch (error) {
        throw error;
      }
    }
  }

  newThesisProposal.CdS.forEach((c) => {
    promises.push(Degree.getDegreeById(c.degreeId));
    degree.push(c.degreeId);
  });

  return Promise.all(promises).then(() => {
    return new Promise(function (resolve, reject) {
      const sql = 'INSERT INTO thesisProposals(title, supervisor, keywords, description, requirements, thesisType, abroad, notes, expirationDate, level, isArchieved) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
      db.run(sql, [newThesisProposal.title,
        professorId,
      JSON.stringify(newThesisProposal.keywords),
      newThesisProposal.description,
      newThesisProposal.requirements,
      newThesisProposal.thesisType,
      newThesisProposal.abroad,
      newThesisProposal.notes != undefined ? newThesisProposal.notes : '',
      newThesisProposal.expirationDate,
      newThesisProposal.level,
        false
      ], function (err) {
        if (err) {
          reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
        } else {
          resolve(this.lastID);
        }
      });
    });
  }).then((lastID) => {
    return new Promise(function (resolve, reject) {
      if (internalCosupervisors.length == 0) {
        resolve(lastID);
      } else {
        let sql = 'INSERT INTO thesisProposal_internalCoSupervisor_bridge (thesisProposalId, internalCoSupervisorId) VALUES ';
        let params = [];

        internalCosupervisors.forEach((c, i) => {
          if (i == 0) {
            sql += '(?, ?)';
          } else {
            sql += ', (?, ?)';
          }

          params.push(lastID);
          params.push(c.coSupervisorId);
        });

        db.run(sql, params, function (err, row) {
          if (err) {
            reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
          } else {
            resolve(lastID);
          }
        });
      }
    })
  }).then((lastID) => {
    return new Promise(function (resolve, reject) {
      if (externalCosupervisors.length == 0) {
        resolve(lastID);
      } else {
        let sql = 'INSERT INTO thesisProposal_externalCoSupervisor_bridge (thesisProposalId, externalCoSupervisorId) VALUES ';
        let params = [];

        externalCosupervisors.forEach((c, i) => {
          if (i == 0) {
            sql += '(?, ?)';
          } else {
            sql += ', (?, ?)';
          }

          params.push(lastID);
          params.push(c.coSupervisorId);
        });

        db.run(sql, params, function (err, row) {
          if (err) {
            reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
          } else {
            resolve(lastID);
          }
        });
      }
    });
  }).then((lastID) => {
    return new Promise(function (resolve, reject) {
      if (degree.length == 0) {
        reject(new PromiseError({ code: 500, message: "internal Server Error" }));
      } else {
        let sql = 'INSERT INTO thesisProposal_cds_bridge (thesisProposalId, cdsId) VALUES ';
        let params = [];

        degree.forEach((d, i) => {
          if (i == 0) {
            sql += '(?, ?)';
          } else {
            sql += ', (?, ?)';
          }

          params.push(lastID);
          params.push(d);
        });

        db.run(sql, params, function (err, row) {
          if (err) {
            reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
          } else {
            resolve(lastID);
          }
        });
      }
    });
  }).then(async (lastID) => {
    let emailPromises = [];
    let notificationPromises = [];

    try {
      internalCosupervisors.forEach((i) => {
        emailPromises.push(smtp.sendMail(smtp.mailConstructor(i.email, smtp.subjectInsertCoSupervisor, `${smtp.textInsertCoSupervisor} ${newThesisProposal.title}`)));
        notificationPromises.push(Notification.insertNewNotification(i.coSupervisorId, smtp.subjectInsertCoSupervisor, 3));
      });

      await Promise.all(notificationPromises);
      await Promise.all(emailPromises);

      return { newThesisProposal: `/api/thesisProposals/${lastID}` };
    } catch (error) {
      return { newThesisProposal: `/api/thesisProposals/${lastID}` };
    }
  });
}

exports.updateThesisProposal = async function (professorId, thesisProposal, thesisProposalId) {
  let promises = [];
  let emailPromises = [];
  let notificationPromises = [];

  let newCoSupervisors = [];
  let oldCoSupervisors = [];
  let oldDegrees = [];
  let newDegrees = [];

  let regex = new RegExp("(p|P)[0-9]{6}");

  if (dayjs(thesisProposal.expirationDate).diff() <= 0) {
    throw new PromiseError({ code: 400, message: "Bad Request" });
  }

  promises.push(new Promise(function (resolve, reject) {
    const sql = "SELECT supervisor FROM thesisProposals WHERE thesisProposalId = ? AND supervisor = ?";
    db.get(sql, [thesisProposalId, professorId], function (err, row) {
      if (err) {
        reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
      } else if (row == undefined) {
        reject(new PromiseError({ code: 404, message: "Not Found" }));
      } else {
        resolve();
      }
    })
  }));

  let externalCosupervisorList = await ExternalCoSupervisor.getExternalCoSupervisorsByThesisProposalId(thesisProposalId);
  let internalCosupervisorList = await Professor.getInternalCoSupervisorByThesisProposalId(thesisProposalId);

  externalCosupervisorList.forEach((e) => oldCoSupervisors.push(e));
  internalCosupervisorList.forEach((e) => oldCoSupervisors.push(e));
  oldDegrees = await Degree.getDegreesByThesisProposalId(thesisProposalId);

  if (thesisProposal?.coSupervisor) {
    for (let c of thesisProposal.coSupervisor) {
      try {
        if (regex.test(c.coSupervisorId)) {
          let internalCoSupervisor = await Professor.getProfessorById(c.coSupervisorId);

          newCoSupervisors.push({ coSupervisorId: internalCoSupervisor.professorId, email: internalCoSupervisor.email });
        } else {
          let externalCoSupervisor = await ExternalCoSupervisor.getExternalCoSupervisorById(c.coSupervisorId);

          newCoSupervisors.push({ coSupervisorId: externalCoSupervisor.externalCoSupervisorId, email: externalCoSupervisor.email });
        }
      } catch (error) {
        throw error;
      }
    }
  }
  thesisProposal.CdS.forEach((c) => newDegrees.push(c.degreeId));

  oldCoSupervisors.forEach((e1) => {
    if (newCoSupervisors.find((e2) => e2.coSupervisorId === e1.coSupervisorId)) {
      oldCoSupervisors = oldCoSupervisors.filter((c) => c.coSupervisorId != e1.coSupervisorId);
      newCoSupervisors = newCoSupervisors.filter((c) => c.coSupervisorId != e1.coSupervisorId);
    }
  });

  oldDegrees.forEach((e1) => {
    if (newDegrees.find((e2) => e2 === e1)) {
      oldDegrees = oldDegrees.filter((r) => r != e1);
      newDegrees = newDegrees.filter((c) => c != e1);
    }
  });

  if (oldCoSupervisors.length > 0) {
    oldCoSupervisors.forEach((c) => {
      if (regex.test(c.coSupervisorId)) { //Is an internal cosupervisor
        promises.push(new Promise(function (resolve, reject) {
          const sql = "DELETE FROM thesisProposal_internalCoSupervisor_bridge WHERE thesisProposalId = ? AND internalCoSupervisorId = ?";
          db.run(sql, [thesisProposalId, c.coSupervisorId], function (err) {
            if (err) {
              reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
            } else {
              resolve();
            }
          });
        }));

        emailPromises.push(smtp.sendMail(smtp.mailConstructor(c.email, smtp.subjectRemoveCoSupervisor, `${smtp.textRemoveCoSupervisor} ${thesisProposal.title}`)));
        notificationPromises.push(Notification.insertNewNotification(c.coSupervisorId, smtp.subjectRemoveCoSupervisor, 4));
      } else { //Is an external cosupervisor
        promises.push(new Promise(function (resolve, reject) {
          const sql = "DELETE FROM thesisProposal_externalCoSupervisor_bridge WHERE thesisProposalId = ? AND externalCoSupervisorId = ?";
          db.run(sql, [thesisProposalId, c.coSupervisorId], function (err) {
            if (err) {
              reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
            } else {
              resolve();
            }
          });
        }));
      }
    });
  }

  if (newCoSupervisors.length > 0) {
    newCoSupervisors.forEach((c) => {
      if (regex.test(c.coSupervisorId)) { //Is an internal cosupervisor
        promises.push(new Promise(function (resolve, reject) {
          const sql = "INSERT INTO thesisProposal_internalCoSupervisor_bridge(thesisProposalId, internalCoSupervisorId) VALUES(?, ?)";
          db.run(sql, [thesisProposalId, c.coSupervisorId], function (err) {
            if (err) {
              reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
            } else {
              resolve(this.lastID);
            }
          });
        }));

        emailPromises.push(smtp.sendMail(smtp.mailConstructor(c.email, smtp.subjectInsertCoSupervisor, `${smtp.textInsertCoSupervisor} ${thesisProposal.title}`)));
        notificationPromises.push(Notification.insertNewNotification(c.coSupervisorId, smtp.subjectInsertCoSupervisor, 3));
      } else { //Is an external cosupervisor
        promises.push(new Promise(function (resolve, reject) {
          const sql = "INSERT INTO thesisProposal_externalCoSupervisor_bridge(thesisProposalId, externalCoSupervisorId) VALUES(?, ?)";
          db.run(sql, [thesisProposalId, c.coSupervisorId], function (err) {
            if (err) {
              reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
            } else {
              resolve(this.lastID);
            }
          });
        }));
      }
    });
  }

  if (oldDegrees.length > 0) {
    oldDegrees.forEach((degreeId) => {
      promises.push(new Promise(function (resolve, reject) {
        const sql = "DELETE FROM thesisProposal_cds_bridge WHERE thesisProposalId = ? AND cdsId = ?";
        db.run(sql, [thesisProposalId, degreeId], function (err) {
          if (err) {
            reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
          } else {
            resolve();
          }
        });
      }));
    });
  }

  if (newDegrees.length > 0) {
    newDegrees.forEach((degreeId) => {
      promises.push(new Promise(function (resolve, reject) {
        const sql = "INSERT INTO thesisProposal_cds_bridge(thesisProposalId, cdsId) VALUES(?, ?)";
        db.run(sql, [thesisProposalId, degreeId], function (err) {
          if (err) {
            reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
          } else {
            resolve(this.lastID);
          }
        });
      }));
    });
  }

  return Promise.all(promises).then(() => {
    return new Promise(function (resolve, reject) {
      const sql = 'UPDATE thesisProposals SET title=?, keywords=?, description=?, requirements=?, thesisType=?, abroad=?, notes=?, expirationDate=?, level=? WHERE thesisProposalId = ? AND isArchieved = 0';
      db.run(sql, [
        thesisProposal.title,
        JSON.stringify(thesisProposal.keywords),
        thesisProposal.description,
        thesisProposal.requirements,
        thesisProposal.thesisType,
        thesisProposal.abroad,
        thesisProposal.notes,
        thesisProposal.expirationDate,
        thesisProposal.level,
        thesisProposalId
      ], function (err) {
        if (err) {
          reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
        } else if (this.changes == 0) {
          reject(new PromiseError({ code: 404, message: "Not Found" }));
        } else {
          resolve({ newThesisProposal: `/api/thesisProposals/${thesisProposalId}` });
        }
      })
    });
  }).then(async () => {
    try {
      await Promise.all(notificationPromises);
      await Promise.all(emailPromises);

      return { newThesisProposal: `/api/thesisProposals/${thesisProposalId}` };
    } catch (error) {
      return { newThesisProposal: `/api/thesisProposals/${thesisProposalId}` };
    }
  });
}

exports.deleteThesisProposal = async function (professorId, thesisProposalId) {
  let students;
  let internalCosupervisors;

  try {
    students = await Student.getStudentsByThesisProposalId(thesisProposalId);
    internalCosupervisors = await Professor.getInternalCoSupervisorByThesisProposalId(thesisProposalId);
  } catch (error) {
    students = [];
    internalCosupervisors = [];
  }

  return new Promise(function (resolve, reject) {
    const sql = "SELECT title FROM thesisProposals WHERE thesisProposalId = ?";
    db.get(sql, [thesisProposalId], (err, row) => {
      if (err) {
        reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
      } else if (row === undefined) {
        reject(new PromiseError({ code: 404, message: "Not Found" }));
      } else {
        resolve(row.title);
      }
    });
  }).then((title) => {
    return new Promise(function (resolve, reject) {
      const sql = "DELETE FROM thesisProposals WHERE thesisProposalId = ? AND supervisor = ? AND isArchieved = 0";
      db.run(sql, [thesisProposalId, professorId], function (err) {
        if (err) {
          reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
        } else if (this.changes == 0) {
          reject(new PromiseError({ code: 404, message: "Not Found" }));
        } else {
          resolve(title);
        }
      });
    });
  }).then((title) => {
    return new Promise(function (resolve, reject) {
      if (students.length != 0) {
        const sql = "UPDATE applications SET status = 'Cancelled' WHERE thesisProposalId = ? AND status = 'Pending'";

        db.run(sql, [thesisProposalId], function (err) {
          if (err) {
            reject(new PromiseError({ message: "Internal Server Error", code: 500 }));
          }
        });
      }

      resolve(title);
    });
  }).then(async (title) => {
    let emailPromises = [];
    let notificationPromises = [];

    try {
      internalCosupervisors.forEach((i) => {
        emailPromises.push(smtp.sendMail(smtp.mailConstructor(i.email, smtp.subjectRemoveCoSupervisor, `${smtp.textRemoveCoSupervisor} ${title}`)));

        notificationPromises.push(Notification.insertNewNotification(i.coSupervisorId, smtp.subjectRemoveCoSupervisor, 4));
      });

      students.forEach((s) => {
        emailPromises.push(smtp.sendMail(smtp.mailConstructor(s.email, smtp.subjectCancelApplication, `${smtp.textCancelApplication} ${title}`)));

        notificationPromises.push(Notification.insertNewNotification(s.studentId, smtp.subjectCancelApplication, 5));
      });

      await Promise.all(notificationPromises);
      await Promise.all(emailPromises);
    } catch (error) {
      return;
    }
  });
}

exports.archiveThesisProposal = async function (thesisProposalId, professorId) {
  let sql = '';
  let params = [];

  let students;

  try {
    students = await Student.getStudentsByThesisProposalId(thesisProposalId);
  } catch (error) {
    students = [];
  }

  if (professorId != undefined) {
    sql = 'UPDATE thesisProposals SET isArchieved = 1 WHERE thesisProposalId = ? AND supervisor = ?';
    params = [thesisProposalId, professorId];
  } else {
    sql = 'UPDATE thesisProposals SET isArchieved = 1 WHERE thesisProposalId = ?';
    params = [thesisProposalId];
  }

  return new Promise(function (resolve, reject) {
    db.run(sql, params, function (err) {
      if (err) {
        reject(new PromiseError({ message: "Internal Server Error", code: 500 }));
      } else if (this.changes == 0) {
        reject(new PromiseError({ message: "Bad Request", code: 400 }));
      } else {
        resolve();
      }
    });
  }).then(() => {
    return new Promise(function (resolve, reject) {
      if (students.length != 0) {
        const sql = "UPDATE applications SET status = 'Cancelled' WHERE thesisProposalId = ? AND status = 'Pending'";

        db.run(sql, [thesisProposalId], function (err) {
          if (err) {
            reject(new PromiseError({ message: "Internal Server Error", code: 500 }));
          }
        });
      }

      resolve();
    });
  }).then(() => {
    return new Promise(function (resolve, reject) {
      const sql = "SELECT title FROM thesisProposals WHERE thesisProposalId = ?";
      db.get(sql, [thesisProposalId], (err, row) => {
        if (err) {
          reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
        } else if (row === undefined) {
          reject(new PromiseError({ code: 404, message: "Not Found" }));
        } else {
          resolve(row.title);
        }
      });
    });
  }).then(async (title) => {
    let emailPromises = [];
    let notificationPromises = [];

    try {
      students.forEach((s) => {
        emailPromises.push(smtp.sendMail(smtp.mailConstructor(s.email, smtp.subjectCancelApplication, `${smtp.textCancelApplication} ${title}`)));
        notificationPromises.push(Notification.insertNewNotification(s.studentId, smtp.subjectCancelApplication, 5));
      });

      await Promise.all(notificationPromises);
      await Promise.all(emailPromises);
    } catch (error) {
      return;
    }
  });
}

exports.getThesisProposalDetails = function (thesisProposalId) {
  return new Promise(function (resolve, reject) {
    const sql = "SELECT title, supervisor, email FROM thesisProposals, professors WHERE thesisProposalId = ? AND supervisor = professorId";
    db.get(sql, [thesisProposalId], (err, row) => {
      if (err) {
        reject(new InternalError());
      } else if (row === undefined) {
        reject(new InternalError());
      } else {
        resolve({ title: row.title, supervisor: { professorId: row.supervisor, email: row.email } });
      }
    });
  });
}
