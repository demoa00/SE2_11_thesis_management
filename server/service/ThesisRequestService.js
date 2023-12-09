'use strict';

const dayjs = require('dayjs');

const checkRole = require('../utils/checkRole');
const smtp = require('../utils/smtp');
const { PromiseError } = require('../utils/error');

const db = require('../utils/dbConnection');


exports.getThesisRequests = function () {
    return new Promise(function (resolve, reject) {
        //to do
    });
}

exports.getThesisRequestById = function () {
    return new Promise(function (resolve, reject) {
        //to do
    });
}

exports.insertNewThesisRequest = function () {
    return new Promise(function (resolve, reject) {
        //to do
    });
}

exports.updateThesisRequest = function () {
    return new Promise(function (resolve, reject) {
        //to do
    });
}