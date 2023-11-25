'use strict';

const utils = require('../utils/writer.js');
const ThesisProposal = require('../service/ThesisProposalService');


const isStudent = (user) => {
  if (user.userId != undefined && user.codDegree != undefined && user.role != undefined) {
    if (user.role === 'student') {
      return true;
    }
  }

  return false;
}

const isProfessor = (user) => {
  if (user.userId != undefined && user.codGroup != undefined && user.role != undefined) {
    if (user.role === 'professor') {
      return true;
    }
  }

  return false;
}


module.exports.getThesisProposals = async function getThesisProposals(req, res, next) {
  try {
    let thesisProposalsList;
    
    if (isStudent(req.user)) {
      thesisProposalsList = await ThesisProposal.getThesisProposalsForStudent(req.user.codDegree, req.query);

      utils.writeJson(res, thesisProposalsList, 200);
    } else if (isProfessor(req.user)) {
      thesisProposalsList = await ThesisProposal.getThesisProposalsForProfessor(req.user.userId, req.query.cosupervisor);

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
