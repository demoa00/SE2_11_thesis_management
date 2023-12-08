'use strict';

const fs = require('fs');

const { PromiseError } = require('../utils/error');
const storage = require('../utils/storage');


exports.insertNewCV = function (req, res) {
    return new Promise(function (resolve, reject) {
        storage.uploadFile(req, res, function (err) {
            if (err) {
                reject(new PromiseError({ code: 500, message: err.message }));
            } else if (req.file === undefined) {
                reject(new PromiseError({ code: 500, message: "Internal Server Error" }));
            } else {
                resolve({ code: 200, message: "OK" });
            }
        });
    });
}

exports.getCV = function (studentId) {
    return new Promise((resolve, reject) => {
        const filepath = './uploads/' + studentId + '.pdf';

        if (fs.existsSync(filepath)) {
            fs.readFile(filepath, (err, data) => {
                if (err) {
                    reject(new PromiseError({ code: 500, message: 'Internal Server Error' }));
                } else {
                    resolve(data);
                }
            });
        } else {
            reject(new PromiseError({ message: "Not Found", code: 404 }));
        }
    });
}

exports.deleteCV = function (studentId) {
    return new Promise((resolve, reject) => {
        const filepath = './uploads/' + studentId + '.pdf';

        if (fs.existsSync(filepath)) {
            fs.unlink(filepath, (err) => {
                if (err) {
                    reject(new PromiseError({ message: "Internal Server Error", code: 500 }));
                } else {
                    resolve();
                }
            });
        } else {
            reject(new PromiseError({ message: "Not Found", code: 404 }));
        }
    });
}
