'use strict';

const utils = require('../utils/writer.js');
const Application = require('../service/ApplicationService');


module.exports.getApplications = function getApplications(req, res, next) {
  try {

  } catch (error) {

  }
};


module.exports.getApplicationForStudent = function getApplicationForStudent(req, res, next) {
  try {

  } catch (error) {

  }
};


module.exports.getApplicationForProfessor = function getApplicationForProfessor(req, res, next) {
  try {

  } catch (error) {

  }
};


module.exports.getAllApplicationsOfStudent = async function getAllApplicationsOfStudent(req, res, next) {
  try {
    if (req.user.studentId === undefined) {
      utils.writeJson(res, { error: "Forbidden" }, 403);
    } else {
      let newApplication = await Application.getApplication(req.query.applicationId);

      utils.writeJson(res, newApplication, 200);
    }

  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
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

