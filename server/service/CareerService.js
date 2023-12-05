'use strict';

const { PromiseError } = require('../utils/error');

const db = require('../utils/dbConnection');


exports.getCareer = function (studentId) {
    return new Promise(function (resolve, reject) {
        const sql = "SELECT * FROM careers WHERE studentId = ?";
        db.all(sql, [studentId], (err, rows) => {
            if (err) {
                reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
            } else if (rows.length == 0) {
                reject(new PromiseError({ code: 404, message: "Not Found" }));
            } else {
                let exams = []
                rows.forEach(r => {
                    exams.push({
                        codCourse: r.codCourse,
                        titleCourse: r.titleCourse,
                        cfu: r.cfu,
                        grade: r.grade,
                        date: r.date
                    })
                });
                resolve({ studentId: studentId, exams: exams });
            }
        });
    });
}
