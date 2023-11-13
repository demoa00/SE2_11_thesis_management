'use strict';


/**
 *
 * studentId String 
 * returns student
 **/
exports.getStudentById = function(studentId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "studentId" : "studentId",
  "password" : "password",
  "gender" : "",
  "nationality" : "nationality",
  "codDegree" : "codDegree",
  "enrollmentYear" : 0,
  "surname" : "surname",
  "name" : "name",
  "self" : "http://example.com/aeiou",
  "email" : ""
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

