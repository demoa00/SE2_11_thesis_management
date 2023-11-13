'use strict';


/**
 *
 * authenticatedUserId String The authenticated user id corresponds to the professor that perform this request
 * professorId String 
 * returns thesisProposals
 **/
exports.getAllThesisProposalsOfProfessor = function(authenticatedUserId,professorId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "keywords" : [ "keywords", "keywords" ],
  "self" : "http://example.com/aeiou",
  "title" : "title",
  "thesisProposalId" : 1,
  "expirationDate" : "2000-01-23"
}, {
  "keywords" : [ "keywords", "keywords" ],
  "self" : "http://example.com/aeiou",
  "title" : "title",
  "thesisProposalId" : 1,
  "expirationDate" : "2000-01-23"
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
 * thesisProposalId Integer 
 * returns thesisProposal
 **/
exports.getThesisProposal = function(thesisProposalId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "requirements" : "requirements",
  "notes" : "notes",
  "keywords" : [ "keywords", "keywords" ],
  "level" : "",
  "thesisType" : {
    "abroad" : true,
    "inCompany" : true
  },
  "groups" : [ "groups", "groups" ],
  "description" : "description",
  "title" : "title",
  "coSupervisor" : [ "coSupervisor", "coSupervisor" ],
  "isArchieved" : false,
  "CdS" : [ "CdS", "CdS" ],
  "self" : "http://example.com/aeiou",
  "supervisor" : "supervisor",
  "thesisProposalId" : 1,
  "expirationDate" : "2000-01-23"
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
 * codDegree String The codDegree is about the degree that the student, that perform this request, attends
 * keywords List  (optional)
 * supervisor String  (optional)
 * title String  (optional)
 * inCompany Boolean  (optional)
 * abroad Boolean  (optional)
 * expirationDate date  (optional)
 * returns thesisProposals
 **/
exports.getThesisProposals = function(codDegree,keywords,supervisor,title,inCompany,abroad,expirationDate) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "keywords" : [ "keywords", "keywords" ],
  "self" : "http://example.com/aeiou",
  "title" : "title",
  "thesisProposalId" : 1,
  "expirationDate" : "2000-01-23"
}, {
  "keywords" : [ "keywords", "keywords" ],
  "self" : "http://example.com/aeiou",
  "title" : "title",
  "thesisProposalId" : 1,
  "expirationDate" : "2000-01-23"
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
 * body ThesisProposal  (optional)
 * professorId String 
 * authenticatedUserId String The authenticated user id corresponds to the professor that perform this request
 * returns thesisProposal
 **/
exports.insertNewThesisProposal = function(body,professorId,authenticatedUserId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "requirements" : "requirements",
  "notes" : "notes",
  "keywords" : [ "keywords", "keywords" ],
  "level" : "",
  "thesisType" : {
    "abroad" : true,
    "inCompany" : true
  },
  "groups" : [ "groups", "groups" ],
  "description" : "description",
  "title" : "title",
  "coSupervisor" : [ "coSupervisor", "coSupervisor" ],
  "isArchieved" : false,
  "CdS" : [ "CdS", "CdS" ],
  "self" : "http://example.com/aeiou",
  "supervisor" : "supervisor",
  "thesisProposalId" : 1,
  "expirationDate" : "2000-01-23"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

