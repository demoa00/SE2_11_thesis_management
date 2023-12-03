'use strict';

const utils = require('../utils/writer.js');
const ThesisProposal = require('../service/ThesisProposalService');
const checkRole = require('../utils/checkRole.js');


module.exports.getThesisProposals = async function getThesisProposals(req, res, next) {
  try {
    let thesisProposalsList;

    if (checkRole.isStudent(req.user)) {
      thesisProposalsList = await ThesisProposal.getThesisProposalsForStudent(req.user.codDegree, req.query);

      utils.writeJson(res, thesisProposalsList, 200);
    } else if (checkRole.isProfessor(req.user)) {
      thesisProposalsList = await ThesisProposal.getThesisProposalsForProfessor(req.user.userId, req.query);

      utils.writeJson(res, thesisProposalsList, 200);
    } else {
      utils.writeJson(res, { error: "Forbidden" }, 403);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};

module.exports.getThesisProposalById = async function getThesisProposalById(req, res, next) {
  try {
    let thesisProposal = await ThesisProposal.getThesisProposalById(req.user, req.params.thesisProposalId);

    utils.writeJson(res, thesisProposal, 200);
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};

module.exports.insertNewThesisProposal = async function insertNewThesisProposal(req, res, next) {
  try {
    let newThesisProposalURI = await ThesisProposal.insertNewThesisProposal(req.user.userId, req.body);

    utils.writeJson(res, newThesisProposalURI, 201);
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};

module.exports.updateThesisProposal = async function updateThesisProposal(req, res, next) {
  try {
    let thesisProposalUpdated = await ThesisProposal.updateThesisProposal(req.user.userId, req.body);

    utils.writeJson(res,  thesisProposalUpdated, 200);
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
}

module.exports.deleteThesisProposal = async function deleteThesisProposal(req, res, next) {
  try {
    await ThesisProposal.deleteThesisProposal(req.user.userId, req.params.thesisProposalId);

    utils.writeJson(res, 204);
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
}