'use strict';

const utils = require('../utils/writer.js');
const Application = require('../service/ApplicationService');


module.exports.getApplications = async function getApplications(req, res, next) {
  try {
    if (req.user.studentId != undefined) {
      utils.writeJson(res, { error: "Forbidden" }, 403);
    } else {
      let applicationsList = await Application.getApplications(req.user.professorId);

      utils.writeJson(res, applicationsList, 200);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};


module.exports.getApplicationForStudent = async function getApplicationForStudent(req, res, next) {
  try {
    if (req.user.professorId != undefined) {
      utils.writeJson(res, { error: "Forbidden" }, 403);
    } else {
      let applicationsList = await Application.getAllApplicationsOfStudent(req.user.professorId);

      utils.writeJson(res, applicationsList, 200);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};


module.exports.getApplicationForProfessor = function getApplicationForProfessor(req, res, next) {
  try {

  } catch (error) {

  }
};


module.exports.getAllApplicationsOfStudent = function getAllApplicationsOfStudent(req, res, next) {
  try {

  } catch (error) {

  }
};


module.exports.insertNewApplication = async function insertNewApplication(req, res, next) {
  try {
    if (req.user.studentId === undefined) {
      utils.writeJson(res, { error: "Forbidden" }, 403);
    } else {
      let newApplication = await Application.insertNewApplication(req.user.studentId, req.body);

      utils.writeJson(res, newApplication, 200);
    }

  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};

