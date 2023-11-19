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

<<<<<<< HEAD
module.exports.getThesisProposal = async function getThesisProposal(req, res, next) {
  try {
    let thesisProposal = await ThesisProposal.getThesisProposal(req.params.thesisProposalId);

    utils.writeJson(res, thesisProposal, 200);
=======
module.exports.getThesisProposalStudent = async function getThesisProposal(req, res, next) {
  try {
    if (req.user.professorId != undefined) {
      utils.writeJson(res, { error: "Forbidden" }, 403);
    } else {
      let thesisProposal = await ThesisProposal.getThesisProposal(req.user, req.params.thesisProposalId);
>>>>>>> 6d6fe259ba17739a6af88678b95fe7d91d10067d

      utils.writeJson(res, thesisProposal, 200);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};

<<<<<<< HEAD
module.exports.getThesisProposals = async function getThesisProposals(req, res, next) {
  try {
    if (req.params.studentId !== req.user.studentId) {
      utils.writeJson(res, { error: "Forbidden" }, 403);
    } 

    let thesisProposalList = await ThesisProposal.getThesisProposals(req.user.codDegree);

    utils.writeJson(res, thesisProposalList, 200);
=======
module.exports.getThesisProposalProfessor = async function getThesisProposal(req, res, next) {
  try {
    if (req.user.studentId != undefined || req.user.professorId != req.params.professorId) {
      utils.writeJson(res, { error: "Forbidden" }, 403);
    } else {
      let thesisProposal = await ThesisProposal.getThesisProposal(req.user, req.params.thesisProposalId);

      utils.writeJson(res, thesisProposal, 200);
    }
>>>>>>> 6d6fe259ba17739a6af88678b95fe7d91d10067d
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};

<<<<<<< HEAD
module.exports.insertNewThesisProposal = async function insertNewThesisProposal(req, res, next) {
  try {
    if (req.params.professorId !== req.user.professorId) {
      utils.writeJson(res, { error: "Forbidden" }, 403);
    } 

    let newThesisProposal = await ThesisProposal.insertNewThesisProposal(req.user.professorId, req.body);

    utils.writeJson(res, newThesisProposal, 201);
=======
module.exports.getThesisProposalsOfProfessor = async function getThesisProposalsOfProfessor(req, res, next) {
  try {
    if (req.params.professorId !== req.user.professorId) {
      utils.writeJson(res, { error: "Forbidden" }, 403);
    } else {
      let thesisProposalsList = await ThesisProposal.getThesisProposalsOfProfessor(req.user.professorId, req.query.position);

      utils.writeJson(res, thesisProposalsList, 200);
    }
>>>>>>> 6d6fe259ba17739a6af88678b95fe7d91d10067d
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

