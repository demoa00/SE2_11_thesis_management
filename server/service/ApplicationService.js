'use strict';


/**
 *
 * authenticatedUserId String The authenticated user id corresponds to the student that perform this request
 * studentId String 
 * returns applications
 **/
exports.getAllApplicationsOfStudent = function(authenticatedUserId,studentId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "date" : "2000-01-23",
  "thesisProposalTitle" : "thesisProposalTitle",
  "self" : "http://example.com/aeiou",
  "thesisProposalId" : 1
}, {
  "date" : "2000-01-23",
  "thesisProposalTitle" : "thesisProposalTitle",
  "self" : "http://example.com/aeiou",
  "thesisProposalId" : 1
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * authenticatedUserId String The authenticated user id corresponds to the professor that perform this request
 * applicationId Integer 
 * returns application
 **/
exports.getApplication = function(authenticatedUserId,applicationId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "studentId" : "studentId",
  "date" : "2000-01-23",
  "cv" : "http://example.com/aeiou",
  "isAccepted" : true,
  "self" : "http://example.com/aeiou",
  "message" : "message",
  "isReaded" : false,
  "thesisProposalId" : 0
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
 * authenticatedUserId String The authenticated user id corresponds to the professor that perform this request
 * returns applications
 **/
exports.getApplications = function(authenticatedUserId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "date" : "2000-01-23",
  "thesisProposalTitle" : "thesisProposalTitle",
  "self" : "http://example.com/aeiou",
  "thesisProposalId" : 1
}, {
  "date" : "2000-01-23",
  "thesisProposalTitle" : "thesisProposalTitle",
  "self" : "http://example.com/aeiou",
  "thesisProposalId" : 1
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * body Application  (optional)
 * studentId String 
 * authenticatedUserId String The authenticated user id corresponds to the student that perform this request
 * returns application
 **/
exports.insertNewApplication = function(body,studentId,authenticatedUserId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "studentId" : "studentId",
  "date" : "2000-01-23",
  "cv" : "http://example.com/aeiou",
  "isAccepted" : true,
  "self" : "http://example.com/aeiou",
  "message" : "message",
  "isReaded" : false,
  "thesisProposalId" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

