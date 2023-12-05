'use strict';

const nodemailer = require("nodemailer");
const { PromiseError } = require('../utils/error');


const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 2525
});

exports.subjectDecisionApplication = 'Application decision';
exports.textAcceptApplication = 'Your application has been accepted';
exports.textRejectApplication = 'Your application has been rejected';

exports.subjectNewApplication = 'New application';
exports.textNewApplication = 'You have received new application';

exports.mailConstructor = function (to, subject, text) {
    return {
        from: 'thesisproposal.service@polito.it',
        to: to,
        subject: subject,
        text: text
    };
}

exports.sendMail = function (mailOptions) {
    return new Promise(function (resolve, reject) {
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log(`Unable to send email to ${mailOptions.to} from ${mailOptions.from}`);
                reject(new PromiseError({ code: 500, message: 'Internal Server Error' }));
            } else {
                console.log(`Correctly send email to ${mailOptions.to} from ${mailOptions.from}`);
                resolve();
            }
        });
    });
};
