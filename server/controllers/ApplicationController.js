"use strict";

const utils = require("../utils/writer.js");
const Application = require("../service/ApplicationService");
const checkRole = require("../utils/checkRole.js");


module.exports.getApplications = async function getApplications(req, res, next) {
  try {
    if (req.user.userId != undefined && req.query != undefined) {
      let applicationsList;

      if (checkRole.isStudent(req.user)) {
        applicationsList = await Application.getAllApplicationsForStudent(req.user.userId, req.query);

        utils.writeJson(res, applicationsList, 200);
      } else if (checkRole.isProfessor(req.user)) {
        applicationsList = await Application.getApplicationsForProfessor(req.user.userId, req.query);

        utils.writeJson(res, applicationsList, 200);
      } else {
        utils.writeJson(res, { error: "Forbidden" }, 403);
      }
    } else {
      utils.writeJson(res, { error: "Bad Request" }, 400);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};

module.exports.getApplicationById = async function getApplicationById(req, res, next) {
  try {
    if (req.params.thesisProposalId != undefined && req.params.studentId != undefined && req.user != undefined) {
      let application = await Application.getApplicationById(req.user, req.params.studentId, req.params.thesisProposalId);

      utils.writeJson(res, application, 200);
    } else {
      utils.writeJson(res, { error: "Bad Request" }, 400);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};

module.exports.getApplicationFile = async function getApplicationFile(req, res, next) {
  try {
    if (req.params.thesisProposalId != undefined && req.params.studentId != undefined) {
      let data = await Application.getApplicationFile(req.params.thesisProposalId, req.params.studentId);

      res.set('Content-Type', 'application/pdf');
      res.send(data);
    } else {
      utils.writeJson(res, { error: "Bad Request" }, 400);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
}

module.exports.insertNewApplication = async function insertNewApplication(req, res, next) {
  try {
    if (req.params.thesisProposalId == req.body.thesisProposalId && req.params.thesisProposalId != undefined && req.user.userId != undefined && req.body != undefined) {
      let newApplicationURI = await Application.insertNewApplication(req.user.userId, req.body);

      utils.writeJson(res, newApplicationURI, 201);
    } else {
      utils.writeJson(res, { error: "Bad Request" }, 400);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};

module.exports.updateApplication = async function updateApplication(req, res, next) {
  try {
    if (req.params.thesisProposalId == req.body.thesisProposalId && req.params.thesisProposalId != undefined && req.user.userId != undefined && req.body != undefined) {
      let newApplicationURI = await Application.updateApplication(req.user.userId, req.params.studentId, req.params.thesisProposalId, req.body);

      utils.writeJson(res, newApplicationURI, 200);
    } else {
      utils.writeJson(res, { error: "Bad Request" }, 400);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};
