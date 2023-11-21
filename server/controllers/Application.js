'use strict';

const utils = require('../utils/writer.js');
const Application = require('../service/ApplicationService');


module.exports.getApplications = async function getApplications(req, res, next) {
  try {
    if (req.user.professorId == req.params.professorId) {
      let applicationsList = await Application.getApplications(req.user.professorId);

      utils.writeJson(res, applicationsList, 200);
    } else {
      utils.writeJson(res, { error: "Bad Request" }, 404);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};


module.exports.getApplicationForProfessor = async function getApplicationForProfessor(req, res, next) {
  try {
    if (req.user.professorId == req.params.professorId) {
      let application = await Application.getApplication(req.user, req.params.studentId, req.params.thesisProposalId);

      utils.writeJson(res, application, 200);
    } else {
      utils.writeJson(res, { error: "Bad Request" }, 404);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};


module.exports.updateApplication = async function updateApplication(req, res, next) {
  try {
    if (req.user.professorId == req.params.professorId && req.params.thesisProposalId == req.body.thesisProposalId) {
      let newApplicationURI = await Application.updateApplication(req.user.professorId, req.params.studentId, req.params.thesisProposalId, req.body);

      utils.writeJson(res, newApplicationURI, 200);
    } else {
      utils.writeJson(res, { error: "Bad Request" }, 404);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};


module.exports.getAllApplicationsOfStudent = async function getAllApplicationsOfStudent(req, res, next) {
  try {
    if (req.user.studentId == req.params.studentId) {
      let application = await Application.getAllApplicationsOfStudent(req.user.studentId);

      utils.writeJson(res, application, 200);
    } else {
      utils.writeJson(res, { error: "Bad Request" }, 404);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};


module.exports.getApplicationForStudent = async function getApplicationForStudent(req, res, next) {
  try {
    if (req.user.studentId == req.params.studentId) {
      let application = await Application.getApplication(req.user, req.params.studentId, req.params.thesisProposalId);

      utils.writeJson(res, application, 200);
    } else {
      utils.writeJson(res, { error: "Bad Request" }, 404);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};


module.exports.insertNewApplication = async function insertNewApplication(req, res, next) {
  try {
    if (req.params.thesisProposalId == req.body.thesisProposalId) {
      let newApplicationURI = await Application.insertNewApplication(req.user.studentId, req.body);

      utils.writeJson(res, newApplicationURI, 201);
    } else {
      utils.writeJson(res, { error: "Bad Request" }, 404);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};

