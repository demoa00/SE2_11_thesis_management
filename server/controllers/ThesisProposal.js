'use strict';

const utils = require('../utils/writer.js');
const ThesisProposal = require('../service/ThesisProposalService');


module.exports.getThesisProposals = async function getThesisProposals(req, res, next) {
  try {
    let thesisProposalsList = await ThesisProposal.getThesisProposals(req.user.codDegree, req.query);

    utils.writeJson(res, thesisProposalsList, 200);

  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};


module.exports.getThesisProposalStudent = async function getThesisProposalStudent(req, res, next) {
  try {
    let thesisProposal = await ThesisProposal.getThesisProposal(req.user, req.params.thesisProposalId);

    utils.writeJson(res, thesisProposal, 200);
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};


module.exports.getThesisProposalProfessor = async function getThesisProposalProfessor(req, res, next) {
  try {
    if (req.user.professorId == req.params.professorId) {
      let thesisProposal = await ThesisProposal.getThesisProposal(req.user, req.params.thesisProposalId);

      utils.writeJson(res, thesisProposal, 200);
    } else {
      utils.writeJson(res, { error: "Bad Request" }, 404);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};


module.exports.getThesisProposalsOfProfessor = async function getThesisProposalsOfProfessor(req, res, next) {
  try {
    if (req.user.professorId == req.params.professorId) {
      let thesisProposalsList = await ThesisProposal.getThesisProposalsOfProfessor(req.user.professorId, req.query.cosupervisor);

      utils.writeJson(res, thesisProposalsList, 200);
    } else {
      utils.writeJson(res, { error: "Bad Request" }, 404);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};


module.exports.insertNewThesisProposal = async function insertNewThesisProposal(req, res, next) {
  try {
    if (req.user.professorId == req.params.professorId) {
      let newThesisProposalURI = await ThesisProposal.insertNewThesisProposal(req.user.professorId, req.body);

      utils.writeJson(res, newThesisProposalURI, 201);
    } else {
      utils.writeJson(res, { error: "Bad Request" }, 404);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};

