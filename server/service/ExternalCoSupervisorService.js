'use strict';


/**
 *
 * authenticatedUserId String The authenticated user id corresponds to the professor that perform this request
 * returns List
 **/
exports.getAllExternalCoSupervisors = function(authenticatedUserId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "surname" : "surname",
  "name" : "name",
  "externalCoSupervisorId" : "externalCoSupervisorId",
  "self" : "http://example.com/aeiou",
  "company" : "company",
  "email" : ""
}, {
  "surname" : "surname",
  "name" : "name",
  "externalCoSupervisorId" : "externalCoSupervisorId",
  "self" : "http://example.com/aeiou",
  "company" : "company",
  "email" : ""
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

