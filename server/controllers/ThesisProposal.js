'use strict';

const utils = require('../utils/writer.js');
const Professor = require('../service/ProfessorService');
const ThesisProposal = require('../service/ThesisProposalService');

module.exports.getThesisProposalsOfProfessor = async function getThesisProposalsOfProfessor(req, res, next) {
  try {
    if (req.params.professorId !== req.user.professorId) {
      utils.writeJson(res, { error: "Forbidden" }, 403);
    }

    let thesisProposalsList = await ThesisProposal.getThesisProposalsOfProfessor(req.user.professorId, req.query.filter);

    utils.writeJson(res, thesisProposalsList, 200);
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};

module.exports.getThesisProposal = async function getThesisProposal(req, res, next) {
  try {
    let thesisProposal = await ThesisProposal.getThesisProposal(req.params.thesisProposalId);

    utils.writeJson(res, thesisProposal, 200);

  } catch (error) {

  }
};

module.exports.getThesisProposals = async function getThesisProposals(req, res, next) {
  try {
    if (req.params.studentId !== req.user.studentId) {
      utils.writeJson(res, { error: "Forbidden" }, 403);
    } 

    let thesisProposalList = await ThesisProposal.getThesisProposals(req.user.codDegree);

    utils.writeJson(res, thesisProposalList, 200);
  } catch (error) {

  }
};

module.exports.insertNewThesisProposal = async function insertNewThesisProposal(req, res, next) {
  try {
    if (req.params.professorId !== req.user.professorId) {
      utils.writeJson(res, { error: "Forbidden" }, 403);
    } 

    let newThesisProposal = await ThesisProposal.insertNewThesisProposal(req.user.professorId, req.body);

    utils.writeJson(res, newThesisProposal, 201);
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};
