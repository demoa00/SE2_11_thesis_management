'use strict';

const VirtualClock = require('../service/VirtualClockService.js');
const utils = require('../utils/writer.js');

module.exports.updateVirtualClock = async function updateVirtualClock(req, res, next) {
    try {
        await VirtualClock.updateVirtualClock(req.body.date);

        utils.writeJson(res, { message: 'OK' }, 200);
    } catch (error) {
        utils.writeJson(res, { error: error.message }, error.code);
    }
};
