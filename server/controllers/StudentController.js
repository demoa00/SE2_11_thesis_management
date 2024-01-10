"use strict";

const utils = require("../utils/writer.js");
const Student = require("../service/StudentService");

module.exports.getStudentById = async function getStudentById(req, res, next) {
  try {
    if (req.params.studentId != undefined) {
      let student = await Student.getStudentById(req.params.studentId);

      utils.writeJson(res, student, 200);
    } else {
      utils.writeJson(res, { error: "Bad Request" }, 400);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};
