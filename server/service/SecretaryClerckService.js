'use strict';

const checkRole = require('../utils/checkRole');
const { PromiseError } = require('../utils/error');

const db = require('../utils/dbConnection');


exports.getSecretaryClerckEmployeeByEmail = function (email) {
    return new Promise(function (resolve, reject) {
        const sql = 'SELECT * FROM secretaryClerckEmployees WHERE email = ?';

        db.get(sql, [email], (err, row) => {
            if (err) {console.log(err)
                reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
            } else if (row === undefined) {
                reject(new PromiseError({ code: 404, message: "Not Found" }));
            } else {
                let secretaryClerck = {
                    userId: row.secretaryClerckEmployeeId,
                    email: row.email,
                    role: 'secretary'
                };
                resolve(secretaryClerck);
            }
        });
    });
}

exports.getSecretaryClerckEmployeeById = function (secretaryClerckEmployeeId) {
    return new Promise(function (resolve, reject) {
        const sql = 'SELECT * FROM secretaryClerckEmployees WHERE secretaryClerckEmployeeId = ?';
        db.get(sql, [secretaryClerckEmployeeId], (err, row) => {
            if (err) {
                reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
            } else if (row === undefined) {
                reject(new PromiseError({ code: 404, message: "Not Found" }));
            } else {
                let secretaryClerckEmployee = {
                    secretaryClerckEmployeeId: row.secretaryClerckEmployeeId,
                    name: row.name,
                    surname: row.surname,
                    email: row.email,
                    self: `/api/secretaryClerckEmployees/${row.secretaryClerckEmployeeId}`
                };
                resolve(secretaryClerckEmployee);
            }
        });
    });
}
