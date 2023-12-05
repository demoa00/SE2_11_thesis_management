'use strict';

const utils = require('../utils/writer.js');
const ExternalCoSupervisor = require('../service/ExternalCoSupervisorService');


module.exports.getExternalCoSupervisors = async function getExternalCoSupervisors(req, res, next) {
  try {
    let externalCoSupervisorsList = await ExternalCoSupervisor.getExternalCoSupervisors(req.user);

    utils.writeJson(res, externalCoSupervisorsList, 200);
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};

module.exports.getExternalCoSupervisorById = async function getExternalCoSupervisorById(req, res, next) {
  try {
    let externalCoSupervisor = await ExternalCoSupervisor.getExternalCoSupervisorById(req.params.externalCoSupervisorId);

    utils.writeJson(res, externalCoSupervisor, 200);
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};
