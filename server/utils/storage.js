'use strict';

const multer = require("multer");
const fs = require("fs");

const maxSize = 8000000; //8MB


// Storage manager for curriculum vitae
const storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync('./uploads')) {
            fs.mkdirSync('./uploads');
        }

        if (fs.existsSync('./uploads')) {
            cb(null, './uploads');
        } else {
            cb(new Error('Unable to upload file'));
        }
    },
    filename: function (req, file, cb) {
        const filename = req.user.userId + '.pdf';

        cb(null, filename);
    }
});

const uploadFile1 = multer({
    storage: storage1,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Unable to upload file: mimetype not allowed'));
        }
    }
}).single('file');


// Storage manager for attached file to applications
const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync('./uploads')) {
            fs.mkdirSync('./uploads');
        }

        if (fs.existsSync('./uploads')) {
            cb(null, './uploads');
        } else {
            cb(new Error('Unable to upload file'));
        }
    },
    filename: function (req, file, cb) {
        const filename = req.user.userId + "_" + req.params.thesisProposalId + '.pdf';

        cb(null, filename);
    }
});

const uploadFile2 = multer({
    storage: storage2,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Unable to upload file: mimetype not allowed'));
        }
    }
}).single('file');

module.exports.uploadFile1 = uploadFile1;
module.exports.uploadFile2 = uploadFile2;
