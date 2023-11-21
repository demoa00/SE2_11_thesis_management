'use strict';

const utils = require('../utils/writer.js');
const Student = require('../service/StudentService');


module.exports.getStudentById = async function getStudentById(req, res, next) {
  try {
    let student = await Student.getStudentById(req.params.studentId);
    
    utils.writeJson(res, student, 200);
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};

