'use strict';

const db = require('../utils/dbConnection');

exports.getCareer = function (studentId) {
    return new Promise(function (resolve, reject) {
        const sql = "SELECT * FROM careers WHERE studentId = ?";
        db.all(sql, [studentId], (err, rows) => {
            if (err) {
                reject({ code: 500, message: "Internal Server Error" });
            } else if (rows.length == 0) {
                reject({ code: 404, message: "Not Found" });
            } else {
                let response = []
                rows.forEach(e => {
                    response.push({
                        codCourse: e.codCourse,
                        titleCourse: e.titleCourse,
                        cfu: e.cfu,
                        grade: e.grade,
                        date: e.date
                    })
                });
                resolve({ studentId: studentId, exams: response });
            }
        });
    });
}

