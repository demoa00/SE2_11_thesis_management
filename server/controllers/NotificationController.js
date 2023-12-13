'use strict';

const utils = require('../utils/writer.js');
const Notification = require('../service/NotificationService.js');


module.exports.getNotifications = async function getNotifications(req, res, next) {
    try {
        let notificationsList = await Notification.getNotifications(req.user.userId);

        utils.writeJson(res, notificationsList, 200);
    } catch (error) {
        utils.writeJson(res, { error: error.message }, error.code);
    }
};

module.exports.updateNotification = async function updateNotification(req, res, next) {
    try {
        await Notification.updateNotification(req.user.userId, req.params.notificationId);

        utils.writeJson(res, 'No Content', 204);
    } catch (error) {
        utils.writeJson(res, { error: error.message }, error.code);
    }
};

module.exports.deleteAllNotifications = async function deleteAllNotifications(req, res, next) {
    try {
        await Notification.deleteAllNotifications(req.user.userId);

        utils.writeJson(res, 'No Content', 204);
    } catch (error) {
        utils.writeJson(res, { error: error.message }, error.code);
    }
};
