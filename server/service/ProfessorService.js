'use strict';


/**
 *
 * professorId String 
 * returns professor
 **/
exports.getProfessorById = function(professorId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "codDepartment" : "codDepartment",
  "password" : "password",
  "surname" : "surname",
  "name" : "name",
  "self" : "http://example.com/aeiou",
  "professorId" : "professorId",
  "codGroup" : "codGroup",
  "email" : ""
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * returns professors
 **/
exports.getProfessors = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "surname" : "surname",
  "name" : "name",
  "self" : "http://example.com/aeiou",
  "professorId" : "professorId"
}, {
  "surname" : "surname",
  "name" : "name",
  "self" : "http://example.com/aeiou",
  "professorId" : "professorId"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

