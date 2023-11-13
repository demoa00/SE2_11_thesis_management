'use strict';

var utils = require('../utils/writer.js');
var ThesisProposal = require('../service/ThesisProposalService');

module.exports.getAllThesisProposalsOfProfessor = function getAllThesisProposalsOfProfessor (req, res, next, authenticatedUserId, professorId) {
  ThesisProposal.getAllThesisProposalsOfProfessor(authenticatedUserId, professorId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getThesisProposal = function getThesisProposal (req, res, next, thesisProposalId) {
  ThesisProposal.getThesisProposal(thesisProposalId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getThesisProposals = function getThesisProposals (req, res, next, codDegree, keywords, supervisor, title, inCompany, abroad, expirationDate) {
  ThesisProposal.getThesisProposals(codDegree, keywords, supervisor, title, inCompany, abroad, expirationDate)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.insertNewThesisProposal = function insertNewThesisProposal (req, res, next, body, professorId, authenticatedUserId) {
  ThesisProposal.insertNewThesisProposal(body, professorId, authenticatedUserId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
