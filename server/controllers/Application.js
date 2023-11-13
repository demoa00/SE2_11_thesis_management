'use strict';

var utils = require('../utils/writer.js');
var Application = require('../service/ApplicationService');

module.exports.getAllApplicationsOfStudent = function getAllApplicationsOfStudent (req, res, next, authenticatedUserId, studentId) {
  Application.getAllApplicationsOfStudent(authenticatedUserId, studentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getApplication = function getApplication (req, res, next, authenticatedUserId, applicationId) {
  Application.getApplication(authenticatedUserId, applicationId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getApplications = function getApplications (req, res, next, authenticatedUserId) {
  Application.getApplications(authenticatedUserId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.insertNewApplication = function insertNewApplication (req, res, next, body, studentId, authenticatedUserId) {
  Application.insertNewApplication(body, studentId, authenticatedUserId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
