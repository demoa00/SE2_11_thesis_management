"use strict";

const utils = require("../utils/writer.js");
const SecretaryClerck = require("../service/SecretaryClerckService");


module.exports.getSecretaryClerckEmployeeById = async function getSecretaryClerckEmployeeById(req, res, next) {
    try {
        if (req.params.secretaryClerckEmployeeId) {
            let secretaryClerckEmployee = await SecretaryClerck.getSecretaryClerckEmployeeById(req.params.secretaryClerckEmployeeId);

            utils.writeJson(res, secretaryClerckEmployee, 200);
        } else {
            utils.writeJson(res, { error: "Bad Request" }, 400);
        }
    } catch (error) {
        utils.writeJson(res, { error: error.message }, error.code);
    }
};
