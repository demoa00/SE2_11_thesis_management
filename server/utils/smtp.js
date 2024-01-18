'use strict';

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 2525
});


exports.subjectInsertCoSupervisor = 'Added as co-supervisor for thesis proposal';
exports.textInsertCoSupervisor = 'You are added as a co-supervisor, for thesis proposal:';

exports.subjectRemoveCoSupervisor = 'Removed as co-supervisor for thesis proposal';
exports.textRemoveCoSupervisor = 'You are removed as a co-supervisor, for thesis proposal:';

exports.subjectDecisionApplication = 'Application decision';
exports.textAcceptApplication = 'Your application has been accepted, for thesis proposal:';
exports.textRejectApplication = 'Your application has been rejected, for thesis proposal:';

exports.textAcceptApplicationCoSupervisor = 'An application, where you are a co-supervisor, has been accepted, for thesis proposal:';

exports.subjectCancelApplication = 'Application canceled';
exports.textCancelApplication = 'Your application has been canceled, for thesis proposal:';

exports.subjectNewApplication = 'New application';
exports.textNewApplication = 'You have received new application, for thesis proposal:';

exports.subjectDecisionThesisRequest = 'Thesis Request decision';
exports.textAcceptThesisRequestBySecretary = 'Your thesis request has been accepted by secretary, for thesis request:';
exports.textRejectThesisRequestBySecretary = 'Your thesis request has been rejected by secretary, for thesis request:';

exports.textAcceptThesisRequestByProfessor = 'Your thesis request has been accepted by professor, for thesis request:';
exports.textRejectThesisRequestByProfessor = 'Your thesis request has been rejected by professor, for thesis request:';

exports.subjectInsertThesisRequest = 'Added as supervisor for thesis request';
exports.textInsertThesisRequest = 'You are added as a supervisor, for thesis request:';

exports.textRemoveThesisRequestCoSupervisor = 'You have been removed as a co-supervisor, for thesis request:';
exports.textInsertThesisRequestCoSupervisor = 'You have been added as a co-supervisor, for thesis request:';

exports.subjectDeleteThesisRequest = 'Thesis Request cancelled';
exports.textDeleteThesisRequest = 'The thesis request has been cancelled, for thesis request:';

exports.subjectThesisProposalExpiring = 'Thesis Proposal expiring';
exports.textThesisProposalExpiring = 'Your thesis proposal will expire in a week, for thesis proposal:';

exports.subjectThesisRequestExpired = 'Thesis Request expired';
exports.textThesisRequestExpired = 'Your thesis request has expired, for thesis request:';


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
