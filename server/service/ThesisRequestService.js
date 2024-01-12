'use strict';

const dayjs = require('dayjs');

const Professor = require('./ProfessorService');
const Student = require('./StudentService');
const Notification = require('./NotificationService');
const checkRole = require('../utils/checkRole');
const smtp = require('../utils/smtp');
const { PromiseError } = require('../utils/error');

const db = require('../utils/dbConnection');


exports.getThesisRequestsForProfessor = function (professorId, filter) {
    let sql = "SELECT * FROM thesisRequests WHERE supervisor = ? OR thesisRequestId IN (SELECT thesisRequestId FROM thesisRequest_internalCoSupervisor_bridge WHERE internalCoSupervisorId = ?) AND thesisRequests.secretaryStatus = 'Accepted' ";

    let params = [];
    params.push(professorId);
    params.push(professorId);

    if (filter?.cosupervisor) {
        filter.cosupervisor = filter.cosupervisor instanceof Array ? filter.cosupervisor[0] : filter.cosupervisor;
        if (filter.cosupervisor === 'false') {
            sql = "SELECT * FROM thesisRequests WHERE supervisor = ? AND secretaryStatus = 'Accepted' ";
            params = [professorId];
        } else if (filter.cosupervisor === 'true') {
            sql = "SELECT * FROM thesisRequests WHERE thesisRequestId IN (SELECT thesisRequestId FROM thesisRequest_internalCoSupervisor_bridge WHERE internalCoSupervisorId = ?) AND thesisRequests.secretaryStatus = 'Accepted' ";
            params = [professorId, professorId];
        }
    }

    return new Promise(function (resolve, reject) {
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
            } else if (rows.length == 0) {
                reject(new PromiseError({ code: 404, message: "Not Found" }));
            } else {
                let list = rows.map((r) => ({
                    thesisRequest: r.thesisRequestId,
                    title: r.title,
                    studentId: r.studentId,
                    secretaryStatus: r.secretaryStatus,
                    professorStatus: r.professorStatus,
                    date: r.date,
                    self: `/api/thesisRequests/${r.thesisRequestId}`
                }));

                resolve(list);
            }
        });
    });
}

exports.getThesisRequestsForSecretary = function () {
    return new Promise(function (resolve, reject) {
        const sql = "SELECT * FROM thesisRequests";
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
            } else if (rows.length == 0) {
                reject(new PromiseError({ code: 404, message: "Not Found" }));
            } else {
                let list = rows.map((r) => ({
                    thesisRequest: r.thesisRequest,
                    title: r.title,
                    studentId: r.studentId,
                    secretaryStatus: r.secretaryStatus,
                    professorStatus: r.professorStatus,
                    date: r.date,
                    self: `/api/thesisRequests/${r.thesisRequestId}`
                }));

                resolve(list);
            }
        });
    });
}

exports.getThesisRequestsForStudent = function (studentId) {
    return new Promise(function (resolve, reject) {
        const sql = "SELECT * FROM thesisRequests WHERE sudentId = ?";
        db.all(sql, [studentId], (err, rows) => {
            if (err) {
                reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
            } else if (rows.length == 0) {
                reject(new PromiseError({ code: 404, message: "Not Found" }));
            } else {
                let list = rows.map((r) => ({
                    thesisRequest: r.thesisRequest,
                    title: r.title,
                    studentId: r.studentId,
                    secretaryStatus: r.secretaryStatus,
                    professorStatus: r.professorStatus,
                    date: r.date,
                    self: `/api/thesisRequests/${r.thesisRequestId}`
                }));

                resolve(list);
            }
        });
    });
}

exports.getThesisRequestById = function (user, thesisRequestId) {
    let params = [];
    let sql = "SELECT * FROM thesisRequests WHERE thesisRequestId = ?";

    params.push(thesisRequestId);

    if (checkRole.isProfessor(user)) {
        sql += " AND secretaryStatus = 'Accepted' ";
    }
    if (checkRole.isStudent(user)) {
        sql += " AND studentId = ?";
        params.push(user);
    }

    return new Promise(function (resolve, reject) {
        db.get(sql, params, (err, row) => {
            if (err) {
                reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
            } else if (row == undefined) {
                reject(new PromiseError({ code: 404, message: "Not Found" }));
            } else {
                resolve({
                    thesisRequestId: row.thesisRequestId,
                    thesisProposalId: row.thesisProposalId,
                    supervisor: { professorId: row.supervisor, name: '', surname: '', professor: `/professors/${row.supervisor}` },
                    requester: { studentId: row.studentId, name: '', surname: '', student: `/students/${row.student}` },
                    coSupervisors: [],
                    title: row.title,
                    description: row.description,
                    secretaryStatus: row.secretaryStatus,
                    professorStatus: row.professorStatus,
                    date: row.date,
                    approvalDate: row.approvalDate,
                    self: `/thesisRequests/${thesisRequestId}`
                });
            }
        });
    }).then((thesisRequest) => {
        return new Promise(function (resolve, reject) {
            const sql = "SELECT name, surname FROM professors WHERE professorId = ?";
            db.get(sql, [thesisRequest.supervisor.professorId], (err, row) => {
                if (err) {
                    reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
                } else if (row == undefined) {
                    reject(new PromiseError({ code: 404, message: "Not Found" }));
                } else {
                    thesisRequest.supervisor.name = row.name;
                    thesisRequest.supervisor.surname = row.surname;
                    resolve(thesisRequest);
                }
            });
        });
    }).then((thesisRequest) => {
        return new Promise(function (resolve, reject) {
            const sql = "SELECT name, surname FROM students WHERE studentId = ?";
            db.get(sql, [thesisRequest.requester.studentId], (err, row) => {
                if (err) {
                    reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
                } else if (row == undefined) {
                    reject(new PromiseError({ code: 404, message: "Not Found" }));
                } else {
                    thesisRequest.requester.name = row.name;
                    thesisRequest.requester.surname = row.surname;
                    resolve(thesisRequest);
                }
            });
        });
    }).then((thesisRequest) => {
        return new Promise(function (resolve, reject) {
            const sql = "SELECT professorId, name, surname FROM professors, thesisRequest_internalCoSupervisor_bridge as bridge WHERE professors.professorId = bridge.interalCoSupervisorId AND bridge.thesisRequestId = ?";
            db.all(sql, [thesisRequest.thesisRequestId], (err, rows) => {
                if (err) {
                    reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
                } else {
                    let coSupervisorsList = rows.map(row => ({
                        cosupervisorId: row.professorId,
                        name: row.name,
                        surname: row.surname,
                        coSupervisor: `/professors/${row.professorId}`
                    }));

                    thesisRequest.coSupervisors = coSupervisorsList;
                    resolve(thesisRequest);
                }
            });
        });
    });
}

exports.insertNewThesisRequest = function (studentId, thesisRequest) {
    return new Promise(function (resolve, reject) {
        const sql = "SELECT professorId, email FROM professors WHERE professorId = ?";
        db.get(sql, [thesisRequest.supervisor.professorId], (err, row) => {
            if (err) {
                reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
            } else if (row == undefined) {
                reject(new PromiseError({ code: 404, message: "Not Found" }));
            } else {
                resolve({ professorId: row.professorId, email: row.email });
            }
        });
    }).then((professor) => {
        return new Promise(function (resolve, reject) {
            const sql = "INSERT INTO thesisRequests(studentId, title, supervisor, description, date) VALUES(?, ?, ?, ?, ?)";
            db.run(sql, [studentId, thesisRequest.title, professor.professorId, thesisRequest.description, dayjs().format("YYYY-MM-DD")], function (err) {
                if (err) {
                    reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
                } else {
                    resolve(professor);
                }
            });
        });
    }).then(async (professor) => {
        let promises = [];

        try {
            if (thesisRequest?.cosupervisors) {
                thesisRequest.cosupervisor.forEach((c) => {
                    promises.push(
                        new Promise(function (resolve, reject) {
                            const sql = "INSERT INTO thesisRequest_internalCoSupervisor_bridge(?, ?)";
                            db.run(sql, [thesisRequest.thesisRequestId, c.cosupervisorId], function (err) {
                                if (err) {
                                    reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
                                } else {
                                    resolve();
                                }
                            });
                        }));
                });
            }

            await Promise.all(promises);

            return professor;
        } catch (error) {
            throw error;
        }
    }).then(async (professor) => {
        let emailPromises = [];
        let notificationPromises = [];

        try {
            emailPromises.push(smtp.sendMail(smtp.mailConstructor(professor.email, smtp.subjectInsertThesisRequest, `${smtp.textInsertThesisRequest} ${thesisRequest.title}`)));
            notificationPromises.push(Notification.insertNewNotification(professor.professorId, smtp.subjectInsertThesisRequest, 7));

            await Promise.all(emailPromises);
            await Promise.all(notificationPromises);

            return { newThesisRequest: `/api/thesisRequests` };
        } catch (error) {
            return { newThesisRequest: `/api/thesisRequests` };
        }
    });
}

exports.updateThesisRequestForProfessor = function (professorId, thesisRequest, thesisRequestId) {
    let params = [];
    let sql = "UPDATE thesisRequests SET professorStatus = ?";

    params.push(thesisRequest.professorStatus);

    if (thesisRequest.professorStatus == 'Accepeted') {
        sql += ", approvalDate = ? ";
        params.push(dayjs().format("YYYY-MM-DD"));
    }

    sql += " WHERE thesisRequestId = ? AND supervisor = ? AND (professorStatus = 'Pending' OR professorStatus = 'Change')";
    params.push(thesisRequestId);
    params.push(professorId);

    return new Promise(function (resolve, reject) {
        db.run(sql, params, function (err) {
            if (err) {
                reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
            } else if (this.changes == 0) {
                reject(new PromiseError({ code: 404, message: "Not Found" }));
            } else {
                resolve({ newThesisRequest: `/api/thesisRequests/${thesisRequestId}` });
            }
        });
    }).then(async () => {
        let emailPromises = [];
        let notificationPromises = [];

        try {
            let student = await Student.getStudentById(thesisRequest.requester.studentId);

            if (thesisRequest.professorStatus == 'Change') {
                emailPromises.push(smtp.sendMail(smtp.mailConstructor(studentEmail, smtp.subjectThesisRequestChanges, `The supervisor has requested some changes for your thesis request: ${thesisRequest.title}.\n\nProfessor message:\n${thesisRequest.professorRequestChangesMessage}`)));
                notificationPromises.push(Notification.insertNewNotification(thesisRequest.requester.studentId, smtp.subjectDecisionThesisRequest, 6));
            } else if (thesisRequest.professorStatus == 'Accepted') {
                emailPromises.push(smtp.sendMail(smtp.mailConstructor(studentEmail, smtp.subjectThesisRequestChanges, `${smtp.textAcceptThesisRequestByProfessor} ${thesisRequest.title}`)));
                notificationPromises.push(Notification.insertNewNotification(thesisRequest.requester.studentId, smtp.subjectDecisionThesisRequest, 6));
            } else if (thesisRequest.professorStatus == 'Rejected') {
                emailPromises.push(smtp.sendMail(smtp.mailConstructor(studentEmail, smtp.subjectThesisRequestChanges, `${smtp.textRejectThesisRequestByProfessor} ${thesisRequest.title}`)));
                notificationPromises.push(Notification.insertNewNotification(thesisRequest.requester.studentId, smtp.subjectDecisionThesisRequest, 6));
            }

            await Promise.all(emailPromises);
            await Promise.all(notificationPromises);

            return { newThesisRequest: `/api/thesisRequests/${thesisRequestId}` };
        } catch (error) {
            return { newThesisRequest: `/api/thesisRequests/${thesisRequestId}` };
        }
    });
}

exports.updateThesisRequestForSecretary = function (thesisRequest, thesisRequestId) {
    return new Promise(function (resolve, reject) {
        const sql = "UPDATE thesisRequests SET secretaryStatus = ? WHERE thesisRequestId = ? AND secretaryStatus = 'Pending' ";
        db.run(sql, [thesisRequest.secretaryStatus, thesisRequestId], function (err) {
            if (err) {
                reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
            } else if (this.changes == 0) {
                reject(new PromiseError({ code: 404, message: "Not Found" }));
            } else {
                resolve();
            }
        });
    }).then(function () {
        return new Promise(function (resolve, reject) {
            const sql = "SELECT email FROM students WHERE studentId = ?";
            db.get(sql, [thesisRequest.requester.studentId], (err, row) => {
                if (err) {
                    reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
                } else if (row === undefined) {
                    reject(new PromiseError({ code: 404, message: "Not Found" }));
                } else {
                    resolve(row.email);
                }
            });
        });
    }).then(async (studentEmail) => {
        let emailPromises = [];
        let notificationPromises = [];

        try {
            if (thesisRequest.secretaryStatus == 'Accepted') {
                emailPromises.push(smtp.sendMail(smtp.mailConstructor(studentEmail, smtp.subjectDecisionThesisRequest, `${smtp.textAcceptThesisRequestBySecretary} ${thesisRequest.title}`)));
                notificationPromises.push(Notification.insertNewNotification(thesisRequest.requester.studentId, smtp.subjectThesisRequestChanges, 6));
            } else if (thesisRequest.secretaryStatus == 'Rejected') {
                emailPromises.push(smtp.sendMail(smtp.mailConstructor(studentEmail, smtp.subjectDecisionThesisRequest, `${smtp.textRejectThesisRequestByProfessor} ${thesisRequest.title}`)));
                notificationPromises.push(Notification.insertNewNotification(thesisRequest.requester.studentId, smtp.subjectThesisRequestChanges, 6));
            }

            await Promise.all(emailPromises);
            await Promise.all(notificationPromises);

            return { newThesisRequest: `/api/thesisRequests/${thesisRequestId}` };
        } catch (error) {
            return { newThesisRequest: `/api/thesisRequests/${thesisRequestId}` };
        }
    });
}

exports.updateThesisRequestForStudent = async function (studentId, thesisRequest, thesisRequestId) {
    let promises = [];
    let emailPromises = [];
    let notificationPromises = [];
    let newCoSupervisors = [];

    let oldCoSupervisors = await Professor.getInternalCoSupervisorByThesisRequestId(thesisRequestId);

    if (thesisRequest?.coSupervisors) {
        for (let c of thesisRequest.coSupervisors) {
            try {
                let internalCoSupervisor = await Professor.getProfessorById(c.coSupervisorId);
                newCoSupervisors.push({ coSupervisorId: internalCoSupervisor.professorId, email: internalCoSupervisor.email });
            } catch (error) {
                throw error;
            }
        }
    }

    oldCoSupervisors.forEach((e1) => {
        if (newCoSupervisors.find((e2) => e2.coSupervisorId === e1.coSupervisorId)) {
            oldCoSupervisors = oldCoSupervisors.filter((c) => c.coSupervisorId != e1.coSupervisorId);
            newCoSupervisors = thesisRequest.coSupervisors.filter((c) => c.coSupervisorId != e1.coSupervisorId);
        }
    });

    // old array.lenght > 0 => some cosupervisors has been removed in the new array
    if (oldCoSupervisors.length > 0) {
        oldCoSupervisors.forEach((c) => {
            promises.push(new Promise(function (resolve, reject) {
                const sql = "DELETE FROM thesisRequest_internalCoSupervisor_bridge WHERE thesisRequestId = ? AND internalCoSupervisorId = ?";
                db.run(sql, [thesisRequestId, c.coSupervisorId], function (err) {
                    if (err) {
                        reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
                    } else {
                        resolve();
                    }
                });
            }));

            emailPromises.push(smtp.sendMail(smtp.mailConstructor(c.email, smtp.subjectRemoveCoSupervisor, `${smtp.textRemoveThesisRequestCoSupervisor} ${thesisRequest.title}`)));
            notificationPromises.push(Notification.insertNewNotification(c.coSupervisorId, smtp.subjectRemoveCoSupervisor, 8));
        });
    }

    // new array.lenght > 0 => some cosupervisors has been added 
    if (newCoSupervisors.length > 0) {
        newCoSupervisors.forEach((c) => {
            promises.push(new Promise(function (resolve, reject) {
                const sql = "INSERT INTO thesisRequest_internalCoSupervisor_bridge(thesisRequestId, internalCoSupervisorId) VALUES(?,?)";
                db.run(sql, [thesisRequestId, c.coSupervisorId], function (err) {
                    if (err) {
                        reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
                    } else {
                        resolve();
                    }
                });
            }));

            emailPromises.push(smtp.sendMail(smtp.mailConstructor(c.email, smtp.subjectInsertCoSupervisor, `${smtp.textInsertThesisRequestCoSupervisor} ${thesisRequest.title}`)));
            notificationPromises.push(Notification.insertNewNotification(c.coSupervisorId, smtp.subjectInsertCoSupervisor, 9));
        });
    }

    promises.push(new Promise(function (resolve, reject) {
        const sql = "UPDATE thesisRequests SET title=?, description=?, professorStatus='Pending' WHERE thesisRequestId = ? AND studentId = ?";
        db.run(sql, [thesisRequest.title, thesisRequest.description, thesisRequestId, studentId], function (err) {
            if (err) {
                reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
            } else if (this.changes == 0) {
                reject(new PromiseError({ code: 404, message: "Not Found" }));
            } else {
                resolve();
            }
        });
    }));

    return Promise.all(promises).then(async () => {
        try {
            await Promise.all(notificationPromises);
            await Promise.all(emailPromises);

            return { updatedThesisRequest: `/api/thesisRequests/${thesisRequestId}` };
        } catch (error) {
            return { updatedThesisRequest: `/api/thesisRequests/${thesisRequestId}` };
        }
    });
}

exports.deleteThesisRequest = async function (studentId, thesisRequestId) {
    let supervisor;
    let coSupervisors = [];

    return new Promise(function (resolve, reject) {
        const sql = "SELECT professorId, title FROM thesisRequests WHERE supervisor = ?";
        db.get(sql, [thesisRequestId], (err, row) => {
            if (err) {
                reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
            } else if (row === undefined) {
                reject(new PromiseError({ code: 404, message: "Not Found" }));
            } else {
                resolve({ professorId: row.professorId, title: row.title });
            }
        });
    }).then(async (thesisRequest) => {
        try {
            supervisor = await Professor.getProfessorById(thesisRequest.professorId);
            coSupervisors = await Professor.getInternalCoSupervisorByThesisRequestId(thesisRequestId);
        } catch (error) {
            throw error;
        }
    }).then((thesisRequest) => {
        const sql = "DELETE FROM thesisRequests WHERE thesisRequestId = ? AND studendId = ?";
        db.run(sql, [thesisRequestId, studentId], function (err) {
            if (err) {
                reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
            } else {
                resolve(thesisRequest);
            }
        });
    }).then(async (thesisRequest) => {
        let emailPromises = [];
        let notificationPromises = [];

        try {
            emailPromises.push(smtp.sendMail(smtp.mailConstructor(supervisor.email, smtp.subjectDeleteThesisRequest, `${smtp.textDeleteThesisRequest} ${thesisRequest.title}`)));
            notificationPromises.push(Notification.insertNewNotification(supervisor.professorId, smtp.subjectDeleteThesisRequest, 10));

            coSupervisors.forEach((c) => {
                emailPromises.push(smtp.sendMail(smtp.mailConstructor(c.email, smtp.subjectDeleteThesisRequest, `${smtp.textDeleteThesisRequest} ${thesisRequest.title}`)));
                notificationPromises.push(Notification.insertNewNotification(c.professorId, smtp.subjectDeleteThesisRequest, 10));
            });

            await Promise.all(notificationPromises);
            await Promise.all(emailPromises);

            return;
        } catch (error) {
            return;
        }
    });
}
