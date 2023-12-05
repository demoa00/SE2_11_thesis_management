'use strict';

const utils = require('../utils/writer.js');
const Career = require('../service/CareerService.js');

module.exports.getCareer = async function (req, res, next) {
    try {
        let career = await Career.getCareer(req.params.studentId);

        utils.writeJson(res, career, 200);
    } catch (error) {
        utils.writeJson(res, { error: error.message }, error.code);
    }
};
