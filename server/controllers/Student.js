'use strict';

var utils = require('../utils/writer.js');
var Student = require('../service/StudentService');

module.exports.getStudentById = function getStudentById (req, res, next, studentId) {
  Student.getStudentById(studentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
