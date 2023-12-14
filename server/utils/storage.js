'use strict';

const multer = require('multer');

const maxSize = 8000000; //8MB

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        const filename = req.user.userId + '.pdf';

        cb(null, filename);
    }
});

const uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Unable to upload file: mimetype not allowed'));
        }
    }
}).single('file');

module.exports.uploadFile = uploadFile;
