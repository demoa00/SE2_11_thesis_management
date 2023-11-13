'use strict';

var utils = require('../utils/writer.js');
var ExternalCoSupervisor = require('../service/ExternalCoSupervisorService');

module.exports.getAllExternalCoSupervisors = function getAllExternalCoSupervisors (req, res, next, authenticatedUserId) {
  ExternalCoSupervisor.getAllExternalCoSupervisors(authenticatedUserId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
