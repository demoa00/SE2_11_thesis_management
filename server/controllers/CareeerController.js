'use strict';

const utils = require('../utils/writer.js');
const Career = require('../service/CareerService');

module.exports.getCareer = async function (req, res, next) {
    try {
        let response = await Career.getCareer(req.params.studentId);

        utils.writeJson(res, response, 200);
    } catch (error) {
        utils.writeJson(res, { error: error.message }, error.code);
    }
};
