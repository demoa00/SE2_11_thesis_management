"use strict";

const utils = require("../utils/writer.js");
const Professor = require("../service/ProfessorService");

module.exports.getProfessors = async function getProfessors(req, res, next) {
  try {
    if (req.user != undefined && req.query != undefined) {
      let professorsList = await Professor.getProfessors(req.user, req.query);

      utils.writeJson(res, professorsList, 200);
    } else {
      utils.writeJson(res, { error: "Bad Request" }, 400);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};

module.exports.getProfessorById = async function getProfessorById(req, res, next) {
  try {
    if (req.params.professorId) {
      let professor = await Professor.getProfessorById(req.params.professorId);

      utils.writeJson(res, professor, 200);
    } else {
      utils.writeJson(res, { error: "Bad Request" }, 400);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};
