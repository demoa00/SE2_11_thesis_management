'use strict';

const utils = require('../utils/writer.js');
const Degree = require('../service/DegreeService');


module.exports.getDegrees = async function getDegrees(req, res, next) {
  try {
    let degreesList = await Degree.getDegrees();

    utils.writeJson(res, degreesList, 200);
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};

