'use strict';

const dayjs = require('dayjs');

const ThesisProposal = require('./ThesisProposalService');
const Notification = require('./NotificationService');
const checkRole = require('../utils/checkRole');
const smtp = require('../utils/smtp');
const { PromiseError } = require('../utils/error');

const db = require('../utils/dbConnection');


const filterByStatus = (filter, sql, params) => {
  if (filter?.status) {
    filter.status = filter.status instanceof Array ? filter.status[0] : filter.status;

    if (filter.status === 'Rejected') {
      sql += 'AND status = ?';
      params.push('Rejected');
    } else if (filter.status === 'Pending') {
      sql += 'AND status = ?';
      params.push('Pending');
    } else if (filter.status === 'Accepted') {
      sql += 'AND status = ?';
      params.push('Accepted');
    } else if (filter.status === 'Cancelled') {
      sql += 'AND status = ?';
      params.push('Cancelled');
    }
  }

  return [sql, params];
};


exports.getAllApplicationsForStudent = function (studentId, filter) {
  return new Promise(function (resolve, reject) {
    let sql = 'SELECT applications.thesisProposalId, thesis.title, applications.studentId, applications.date, applications.status FROM applications, (SELECT thesisProposalId, title FROM thesisProposals) AS thesis WHERE applications.thesisProposalId = thesis.thesisProposalId AND applications.studentId = ? ';
    let params = [studentId];

    let res = filterByStatus(filter, sql, params);

    db.all(res[0], res[1], (err, rows) => {
      if (err) {
        reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
      } else if (rows.length == 0) {
        reject(new PromiseError({ code: 404, message: "Not Found" }));
      } else {
        let applicationsList = rows.map((r) => ({
          thesisProposalId: r.thesisProposalId,
          thesisProposalTitle: r.title,
          studentId: r.studentId,
          date: r.date,
          status: r.status
        }));

        resolve(applicationsList);
      }
    });
  });
}

exports.getApplicationsForProfessor = function (professorId, filter) {
  return new Promise(function (resolve, reject) {
    let sql = 'SELECT applications.thesisProposalId, thesis.title, applications.studentId, applications.date, applications.status FROM applications, (SELECT thesisProposalId, title FROM thesisProposals WHERE supervisor = ?) AS thesis WHERE applications.thesisProposalId = thesis.thesisProposalId ';
    let params = [professorId];

    let res = filterByStatus(filter, sql, params);

    db.all(res[0], res[1], (err, rows) => {
      if (err) {
        reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
      } else if (rows.length == 0) {
        reject(new PromiseError({ code: 404, message: "Not Found" }));
      } else {
        let applicationsList = rows.map((r) => ({
          thesisProposalId: r.thesisProposalId,
          thesisProposalTitle: r.title,
          studentId: r.studentId,
          date: r.date,
          status: r.status
        }));

        resolve(applicationsList);
      }
    });
  });
}

exports.getApplicationById = function (user, studentId, thesisProposalId) {
  let sql = '';
  let params = [];

  if (checkRole.isProfessor(user)) {//professor request
    sql = 'SELECT applications.thesisProposalId, students.studentId, students.name, students.surname, thesis.title, applications.message, applications.date, applications.status FROM applications, students, (SELECT thesisProposalId, title FROM thesisProposals WHERE thesisProposalId = ? AND supervisor = ?) AS thesis WHERE applications.studentId = ? AND applications.thesisProposalId = ? AND applications.studentId = students.studentId AND applications.thesisProposalId = thesis.thesisProposalId';
    params = [thesisProposalId, user.userId, studentId, thesisProposalId];
  } else if (checkRole.isStudent(user)) {//student request
    sql = 'SELECT applications.thesisProposalId, students.studentId, students.name, students.surname, thesis.title, applications.message, applications.date, applications.status FROM applications, students, (SELECT thesisProposalId, title FROM thesisProposals WHERE thesisProposalId = ?) AS thesis WHERE applications.studentId = ? AND applications.thesisProposalId = ? AND applications.studentId = students.studentId AND applications.thesisProposalId = thesis.thesisProposalId';
    params = [thesisProposalId, user.userId, thesisProposalId];
  }

  return new Promise(function (resolve, reject) {
    db.get(sql, params, function (err, row) {
      if (err) {
        console.log(err)
        reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
      } else if (row === undefined) {
        reject(new PromiseError({ code: 404, message: "Not Found" }));
      } else {
        let application = {
          thesisProposalId: thesisProposalId,
          title: row.title,
          applicant: { studentId: row.studentId, name: row.name, surname: row.surname, student: `/api/students/${row.studentId}` },
          message: row.message,
          date: row.date,
          status: row.status,
        }
        resolve(application);
      }
    })
  });
}

exports.insertNewApplication = function (studentId, newApplication) {
  return new Promise(function (resolve, reject) {
    const sql = "SELECT * FROM applications WHERE studentId = ? AND status = 'Accepted'";

    db.get(sql, [studentId], (err, row) => {
      if (err) {
        reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
      } else if (row === undefined) {
        resolve();
      } else {
        reject(new PromiseError({ code: 409, message: "Conflict" }));
      }
    });
  }).then(() => {
    return new Promise(function (resolve, reject) {
      const sql = 'SELECT thesisProposals.title, professors.professorId, professors.email FROM professors, thesisProposals WHERE thesisProposalId = ? AND supervisor = professorId';

      db.get(sql, [newApplication.thesisProposalId], (err, row) => {
        if (err) {
          reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
        } else if (row === undefined) {
          reject(new PromiseError({ code: 404, message: "Not Found" }));
        } else {
          let professor = { title: row.title, professorId: row.professorId, email: row.email };

          resolve(professor);
        }
      });
    });
  }).then((professor) => {
    return new Promise(function (resolve, reject) {
      const sql = 'INSERT INTO applications(thesisProposalId, studentId, message, date) VALUES (?, ?, ?, ?)';

      db.run(sql, [newApplication.thesisProposalId, studentId, newApplication.message, dayjs().format('YYYY-MM-DD')], function (err) {
        if (err) {
          reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
        } else {
          resolve(professor);
        }
      });
    });
  }).then(async (professor) => {
    let emailPromises = [];
    let notificationPromises = [];

    try {
      emailPromises.push(smtp.sendMail(smtp.mailConstructor(professor.email, smtp.subjectNewApplication, `${smtp.textNewApplication} ${professor.title}`)));
      notificationPromises.push(Notification.insertNewNotification(professor.professorId, smtp.subjectNewApplication, 1));

      await Promise.all(emailPromises);
      await Promise.all(notificationPromises);

      return { newApplication: `/api/applications/${newApplication.thesisProposalId}/${studentId}` };
    } catch (error) {
      throw error;
    }
  });
}

exports.updateApplication = function (professorId, studentId, thesisProposalId, newApplication) {
  return new Promise(function (resolve, reject) {
    const sql = "SELECT applications.studentId, students.email FROM applications, students WHERE status = 'Pending' AND thesisProposalId = ? AND applications.studentId = students.studentId";

    db.all(sql, [thesisProposalId], (err, rows) => {
      if (err) {
        reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
      } else if (rows.length == 0) {
        resolve([]);
      } else {
        let students = rows.map((r) => ({ studentId: r.studentId, email: r.email }));

        resolve(students);
      }
    });
  }).then((students) => {
    return new Promise(function (resolve, reject) {
      const sql = "UPDATE applications SET status = ? WHERE status = 'Pending' AND thesisProposalId = ? AND studentId = ? AND thesisProposalId IN (SELECT thesisProposalId FROM thesisProposals WHERE supervisor = ?)";

      db.run(sql, [newApplication.status, thesisProposalId, studentId, professorId], function (err) {
        if (err) {
          reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
        } else if (this.changes == 0) {
          reject(new PromiseError({ code: 404, message: "Not Found" }));
        } else {
          resolve(students)
        }
      });
    })
  }).then((students) => {
    return new Promise(function (resolve, reject) {
      if (newApplication.status === "Accepted") {
        const sql = "UPDATE applications SET status = 'Rejected' WHERE status = 'Pending' AND thesisProposalId = ? AND thesisProposalId IN (SELECT thesisProposalId FROM thesisProposals WHERE supervisor = ?)";
        db.run(sql, [thesisProposalId, professorId], function (err) {
          if (err) {
            reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
          }
        });
      }

      resolve(students);
    }).then((students) => {
      return new Promise(function (resolve, reject) {
        if (newApplication.status === 'Accepted') {
          const sql = "UPDATE applications SET status = 'Cancelled' WHERE status = 'Pending' AND studentId = ?";
          db.run(sql, [studentId], function (err) {
            if (err) {
              reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
            }
          });
        }

        resolve(students);
      });
    });
  }).then(async (students) => {
    let emailPromises = [];
    let notificationPromises = [];

    try {
      if (newApplication.status === 'Accepted') {
        await ThesisProposal.archiveThesisProposal(thesisProposalId);

        students.forEach((s) => {
          if (s.studentId === studentId) {
            emailPromises.push(smtp.sendMail(smtp.mailConstructor(s.email, smtp.subjectDecisionApplication, smtp.textAcceptApplication)));
          } else {
            emailPromises.push(smtp.sendMail(smtp.mailConstructor(s.email, smtp.subjectDecisionApplication, smtp.textRejectApplication)));
          }

          notificationPromises.push(Notification.insertNewNotification(s.studentId, smtp.subjectDecisionApplication, 2));
        });
      } else {
        students.forEach((s) => {
          if (s.studentId === studentId) {
            emailPromises.push(smtp.sendMail(smtp.mailConstructor(s.email, smtp.subjectDecisionApplication, smtp.textRejectApplication)));

            notificationPromises.push(Notification.insertNewNotification(s.studentId, smtp.subjectDecisionApplication, 2));
          }
        });
      }

      await Promise.all(notificationPromises);
      await Promise.all(emailPromises);

      return { newApplication: `/api/applications/${newApplication.thesisProposalId}/${studentId}` };
    } catch (error) {
      throw error;
    }
  });
}
