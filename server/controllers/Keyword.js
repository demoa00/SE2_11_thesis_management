'use strict';

var utils = require('../utils/writer.js');
var Keyword = require('../service/KeywordService');

module.exports.getKeywords = async function getKeywords (req, res, next) {
  try {
    let keywordsList = await Keyword.getKeywords();

    utils.writeJson(res, keywordsList, 200);
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};
