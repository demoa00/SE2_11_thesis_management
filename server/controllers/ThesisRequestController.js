"use strict";

const utils = require("../utils/writer.js");
const ThesisRequest = require("../service/ThesisRequestService");
const checkRole = require("../utils/checkRole.js");

module.exports.getThesisRequests = async function getThesisRequests(req, res, next) {
    try {
        let thesisRequestList;
        if (checkRole.isProfessor(req.user)) {  // get the requests for his own thesis
            thesisRequestList = await ThesisRequest.getThesisRequestsForProfessor(req.user.userId);
            utils.writeJson(res, thesisRequestList, 200);
        } else if (checkRole.isSecretaryClerck(req.user)) { // get all the requests 
            thesisRequestList = await ThesisRequest.getThesisRequestsForSecretary();
            utils.writeJson(res, thesisRequestList, 200);
        } else {
            utils.writeJson(res, { error: "Forbidden" }, 403);
        }
    } catch (error) {
        utils.writeJson(res, { error: error.message }, error.code);
    }
};

module.exports.insertNewThesisRequest = async function insertNewThesisRequest(req, res, next) {
    try {
        let newThesisRequest = await ThesisRequest.insertNewThesisRequest(req.user.userId, req.body);
        if (newThesisRequest instanceof PromiseError) {
            utils.writeJson(res, { error: newThesisRequest.message }, newThesisRequest.code);
        } else {
            utils.writeJson(res, newThesisRequest, 200);
        }
    } catch (error) {
        utils.writeJson(res, { error: error.message }, error.code);
    }
};

module.exports.getThesisRequestById = async function getThesisRequestById(req, res, next) {
    try {
        let thesisRequest = await ThesisRequest.getThesisRequestById(req.user, req.params.thesisRequestId);
        utils.writeJson(res, thesisRequest, 200);
    } catch (error) {
        utils.writeJson(res, { error: error.message }, error.code);
    }
};

module.exports.updateThesisRequest = async function updateThesisRequest(req, res, next) {
    try {
        let thesisRequestUpdated = await ThesisRequest.updateThesisRequest(req.user.userId, req.body, req.params.thesisRequestId);
        if (thesisRequestUpdated instanceof PromiseError) {
            utils.writeJson(res, { error: thesisRequestUpdated.message }, thesisRequestUpdated.code);
        } else {
            utils.writeJson(res, thesisRequestUpdated, 200);
        }
    } catch (error) {
        utils.writeJson(res, { error: error.message }, error.code);
    }
};