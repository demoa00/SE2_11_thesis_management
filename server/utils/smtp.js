'use strict';

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 2525
});


exports.subjectInsertCoSupervisor = 'Added as co-supervisor';
exports.textInsertCoSupervisor = 'You are added as a co-supervisor, for thesis proposal:';

exports.subjectRemoveCoSupervisor = 'Removed as co-supervisor';
exports.textRemoveCoSupervisor = 'You are removed as a co-supervisor, for thesis proposal:';

exports.subjectDecisionApplication = 'Application decision';
exports.textAcceptApplication = 'Your application has been accepted, for thesis proposal:';
exports.textRejectApplication = 'Your application has been rejected, for thesis proposal:';

exports.subjectCancelApplication = 'Application canceled';
exports.textCancelApplication = 'Your application has been canceled, for thesis proposal:';

exports.subjectNewApplication = 'New application';
exports.textNewApplication = 'You have received new application, for thesis proposal:';

exports.subjectThesisRequestChanges = 'Thesis Request decision';
exports.textAcceptThesisRequest = 'Your thesis request has been accepted, for thesis request:';
exports.textRejectThesisRequest = 'Your thesis request has been rejected, for thesis request:';

exports.subjectInsertThesisRequest = 'Added as supervisor, for thesis request:';
exports.textInsertThesisRequest = 'You are added as a supervisor, for thesis request:';

exports.textRemoveThesisRequestCoSupervisor = 'You have been removed as a co-supervisor, for thesis request:';
exports.textInsertThesisRequestCoSupervisor = 'You have been added as a co-supervisor, for thesis request:';


exports.subjectDeleteThesisRequest = 'Thesis Request cancelled';
exports.textDeleteThesisRequest = 'The request has been cancelled, for thesis request:';

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
                resolve();
            } else {
                console.log(`Correctly send email to ${mailOptions.to} from ${mailOptions.from}`);
                resolve();
            }
        });
    });
};
