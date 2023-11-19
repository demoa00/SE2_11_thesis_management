'use strict';

const utils = require('../utils/writer.js');
const Professor = require('../service/ProfessorService');
const ThesisProposal = require('../service/ThesisProposalService');


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

module.exports.getThesisProposalStudent = async function getThesisProposal(req, res, next) {
  try {
    if (req.user.professorId != undefined) {
      utils.writeJson(res, { error: "Forbidden" }, 403);
    } else {
      let thesisProposal = await ThesisProposal.getThesisProposal(req.user, req.params.thesisProposalId);

      utils.writeJson(res, thesisProposal, 200);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};

module.exports.getThesisProposalProfessor = async function getThesisProposal(req, res, next) {
  try {
    if (req.user.studentId != undefined || req.user.professorId != req.params.professorId) {
      utils.writeJson(res, { error: "Forbidden" }, 403);
    } else {
      let thesisProposal = await ThesisProposal.getThesisProposal(req.user, req.params.thesisProposalId);

      utils.writeJson(res, thesisProposal, 200);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};

module.exports.getThesisProposalsOfProfessor = async function getThesisProposalsOfProfessor(req, res, next) {
  try {
    if (req.params.professorId !== req.user.professorId) {
      utils.writeJson(res, { error: "Forbidden" }, 403);
    } else {
      let thesisProposalsList = await ThesisProposal.getThesisProposalsOfProfessor(req.user.professorId, req.query.position);

      utils.writeJson(res, thesisProposalsList, 200);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};

module.exports.insertNewThesisProposal = async function insertNewThesisProposal(req, res, next) {
  try {
    if (req.user.professorId == undefined) {
      utils.writeJson(res, { error: "Forbidden" }, 403)
    } else {
      let newThesisProposalURI = await ThesisProposal.insertNewThesisProposal(req.user.professorId, req.body);

      utils.writeJson(res, newThesisProposalURI, 201);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};

