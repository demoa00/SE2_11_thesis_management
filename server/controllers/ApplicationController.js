'use strict';

const utils = require('../utils/writer.js');
const Application = require('../service/ApplicationService');


const isStudent = (user) => {
  if (user.userId != undefined && user.codDegree != undefined && user.role != undefined) {
    if (user.role === 'student') {
      return true;
    }
  }

  return false;
}

const isProfessor = (user) => {
  if (user.userId != undefined && user.codGroup != undefined && user.role != undefined) {
    if (user.role === 'professor') {
      return true;
    }
  }

  return false;
}


module.exports.getApplications = async function getApplications(req, res, next) {
  try {
    let applicationsList;

    if (isStudent(req.user)) {
      applicationsList = await Application.getAllApplicationsForStudent(req.user.userId);

      utils.writeJson(res, applicationsList, 200);
    } else if (isProfessor(req.user)) {
      applicationsList = await Application.getApplicationsForProfessor(req.user.userId);

      utils.writeJson(res, applicationsList, 200);
    } else {
      utils.writeJson(res, { error: "Forbidden" }, 403);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};

module.exports.getApplicationById = async function getApplicationById(req, res, next) {
  try {
    let application = await Application.getApplicationById(req.user, req.params.studentId, req.params.thesisProposalId);

    utils.writeJson(res, application, 200);
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};

module.exports.insertNewApplication = async function insertNewApplication(req, res, next) {
  try {
    if (req.params.thesisProposalId == req.body.thesisProposalId) {
      let newApplicationURI = await Application.insertNewApplication(req.user.userId, req.body);

      utils.writeJson(res, newApplicationURI, 201);
    } else {
      utils.writeJson(res, { error: "Bad Request" }, 404);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};

module.exports.updateApplication = async function updateApplication(req, res, next) {
  try {
    if (req.params.thesisProposalId == req.body.thesisProposalId) {
      let newApplicationURI = await Application.updateApplication(req.user.userId, req.params.studentId, req.params.thesisProposalId, req.body);

      utils.writeJson(res, newApplicationURI, 200);
    } else {
      utils.writeJson(res, { error: "Bad Request" }, 404);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};
