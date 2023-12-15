"use strict";

const utils = require("../utils/writer.js");
const Career = require("../service/CareerService.js");

module.exports.getCareer = async function (req, res, next) {
  try {
    if (req.params.studentId != undefined) {
      let career = await Career.getCareer(req.params.studentId);

      utils.writeJson(res, career, 200);
    } else {
      utils.writeJson(res, { error: "Bad Request" }, 404);
    }
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};
