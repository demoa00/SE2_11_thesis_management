'use strict';

const utils = require('../utils/writer.js');
const CurriculumVitae = require('../service/CurriculumVitaeService');


module.exports.insertNewCV = async function (req, res, next) {
    try {
        let response = await CurriculumVitae.insertNewCV(req, res);

        utils.writeJson(res, response.message, response.code);
    } catch (error) {
        utils.writeJson(res, error.message, error.code);
    }
};

module.exports.getCV = async function (req, res, next) {
    try {
        let data = await CurriculumVitae.getCV(req.params.studentId);

        res.set('Content-Type', 'application/pdf');
        res.send(data);
    } catch (error) {
        utils.writeJson(res, error.message, error.code);
    }
};
