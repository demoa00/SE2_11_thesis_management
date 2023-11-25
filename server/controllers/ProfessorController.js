'use strict';

const utils = require('../utils/writer.js');
const Professor = require('../service/ProfessorService');


module.exports.getProfessors = async function getProfessors(req, res, next) {
  try {
    let professorsList = await Professor.getProfessors();

    utils.writeJson(res, professorsList, 200);
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};

module.exports.getProfessorById = async function getProfessorById(req, res, next) {
  try {
    let professor = await Professor.getProfessorById(req.params.professorId);

    utils.writeJson(res, professor, 200);
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};
