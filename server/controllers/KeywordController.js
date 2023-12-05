'use strict';

const utils = require('../utils/writer.js');
const Keyword = require('../service/KeywordService');


module.exports.getKeywords = async function getKeywords (req, res, next) {
  try {
    let keywordsList = await Keyword.getKeywords();

    utils.writeJson(res, keywordsList, 200);
  } catch (error) {
    utils.writeJson(res, { error: error.message }, error.code);
  }
};
