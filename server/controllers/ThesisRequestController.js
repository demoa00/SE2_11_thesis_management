"use strict";

const utils = require("../utils/writer.js");
const ThesisRequest = require("../service/ThesisRequestService");
const checkRole = require("../utils/checkRole.js");

module.exports.getThesisRequests = async function getThesisRequests(req, res, next) {
  try {
    let thesisRequestList;
    
    if (checkRole.isProfessor(req.user)) {
      // get the requests for his own thesis
      thesisRequestList = await ThesisRequest.getThesisRequestsForProfessor(req.user.userId);
<<<<<<< HEAD
=======

>>>>>>> 257fb452411d385425e7fa5d801640a9791bd4f9
      utils.writeJson(res, thesisRequestList, 200);
    } else if (checkRole.isSecretaryClerck(req.user)) {
      // get all the requests
      thesisRequestList = await ThesisRequest.getThesisRequestsForSecretary();

      utils.writeJson(res, thesisRequestList, 200);
    } else {
      utils.writeJson(res, { error: "Forbidden" }, 403);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};

module.exports.getThesisRequestById = async function getThesisRequestById(req, res, next) {
  try {
    if (req.user != undefined && req.params.thesisRequestId != undefined) {
      let thesisRequest = await ThesisRequest.getThesisRequestById(req.user, req.params.thesisRequestId);
<<<<<<< HEAD
=======

>>>>>>> 257fb452411d385425e7fa5d801640a9791bd4f9
      utils.writeJson(res, thesisRequest, 200);
    } else {
      utils.writeJson(res, { error: "Bad Request" }, 404);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};

module.exports.insertNewThesisRequest = async function insertNewThesisRequest(req, res, next) {
  try {
    if (req.user.userId != undefined && req.body != undefined) {
      let newThesisRequest = await ThesisRequest.insertNewThesisRequest(req.user.userId, req.body);
<<<<<<< HEAD
=======

>>>>>>> 257fb452411d385425e7fa5d801640a9791bd4f9
      utils.writeJson(res, newThesisRequest, 200);
    } else {
      utils.writeJson(res, { error: "Bad Request" }, 404);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};

module.exports.updateThesisRequest = async function updateThesisRequest(req, res, next) {
  try {
<<<<<<< HEAD
    let thesisRequestUpdated;
    if (checkRole.isProfessor(req.user)) {
      thesisRequestUpdated = await ThesisRequest.updateThesisRequestForProfessor(req.user.userId, req.body, req.params.thesisRequestId);
=======
    if (req.user.userId != undefined && req.body != undefined && req.params.thesisRequestId != undefined) {
      let thesisRequestUpdated = await ThesisRequest.updateThesisRequest(req.user.userId, req.body, req.params.thesisRequestId);

>>>>>>> 257fb452411d385425e7fa5d801640a9791bd4f9
      utils.writeJson(res, thesisRequestUpdated, 200);
    }
    if (checkRole.isSecretaryClerck(req.user)) {
      thesisRequestUpdated = await ThesisRequest.updateThesisRequestForSecretary(req.body, req.params.thesisRequestId);
      utils.writeJson(res, thesisRequestUpdated, 200);
    }
    if (checkRole.isStudent(req.user)) {
      thesisRequestUpdated = await ThesisRequest.updateThesisRequestForStudent(req.user.userId, req.body, req.params.thesisRequestId);
      utils.writeJson(res, thesisRequestUpdated, 200);
    }
    else {
      utils.writeJson(res, { error: "Bad Request" }, 404);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};
