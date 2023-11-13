'use strict';

var utils = require('../utils/writer.js');
var Professor = require('../service/ProfessorService');

module.exports.getProfessorById = function getProfessorById (req, res, next, professorId) {
  Professor.getProfessorById(professorId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getProfessors = function getProfessors (req, res, next) {
  Professor.getProfessors()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
