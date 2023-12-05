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
                reject(new PromiseError({ code: 500, message: "Unable to upload file: empty file" }));
            } else {
                resolve({ code: 200, message: "File uploaded successfully" });
            }
        });
    });
}

exports.getCV = function (studentId) {
    return new Promise((resolve, reject) => {
        const filepath = './uploads/' + studentId + '.pdf';

        fs.readFile(filepath, (err, data) => {
            if (err) {
                reject(new PromiseError({ code: 404, message: 'File not Found' }));
            } else {
                resolve(data);
            }
        });
    });
}
