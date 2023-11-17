'use strict';

const utils = require('../utils/writer.js');
const Professor = require('../service/ProfessorService');
const ThesisProposal = require('../service/ThesisProposalService');


module.exports.getThesisProposalsOfProfessor = async function getThesisProposalsOfProfessor(req, res, next) {
  try {
    if (req.params.professorId !== req.user.professorId) {
      utils.writeJson(res, { error: "Forbidden" }, 403);
    } else {
      let thesisProposalsList = await ThesisProposal.getThesisProposalsOfProfessor(req.user.professorId, req.query.filter);

      utils.writeJson(res, thesisProposalsList, 200);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};

module.exports.getThesisProposal = function getThesisProposal(req, res, next) {
  try {

  } catch (error) {

  }
};

module.exports.getThesisProposals = async function getThesisProposals(req, res, next) {
  try {
    if (req.user.studentId === undefined) {
      utils.writeJson(res, { error: "Forbidden" }, 403);
    } else {
      let thesisProposalsList = await ThesisProposal.getThesisProposals(req.user.codDegree, req.query);

      utils.writeJson(res, thesisProposalsList, 200);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};

module.exports.insertNewThesisProposal = function insertNewThesisProposal(req, res, next) {
  try {

  } catch (error) {

  }
};

