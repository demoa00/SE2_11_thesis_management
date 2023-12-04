'use strict';

//-- -- -- -- -- -- --
// SERVER DEPENDENCES
//-- -- -- -- -- -- --

require('dotenv').config();

const configCors = require('./config.js').config();
const http = require('http');
const session = require('express-session');
const passport = require('passport');
const saml = require('passport-saml').Strategy;
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const oas3Tools = require('oas3-tools');
const { Validator, ValidationError } = require('express-json-validator-middleware');
const addFormats = require('ajv-formats').default;
const fs = require('fs');
const path = require('path');
const { constants } = require('fs/promises');


//-- -- -- -- -- -- -- -- -- --
// IMPORT RESOURCE CONTROLLERS
//-- -- -- -- -- -- -- -- -- --

const thesisProposalController = require(path.join(__dirname, 'controllers/ThesisProposalController'));
const applicationController = require(path.join(__dirname, 'controllers/ApplicationController'));
const studentController = require(path.join(__dirname, 'controllers/StudentController'));
const professorController = require(path.join(__dirname, 'controllers/ProfessorController'));
const externalCoSupervisorController = require(path.join(__dirname, 'controllers/ExternalCoSupervisorController'));
const keywordController = require(path.join(__dirname, 'controllers/KeywordController'));
const degreeController = require(path.join(__dirname, 'controllers/DegreeController'));
const curriculumVitaeController = require(path.join(__dirname, 'controllers/CurriculumVitaeController'));


//-- -- -- -- -- -- -- -- -- --
// IMPORT RESOURCE SERVICES
//-- -- -- -- -- -- -- -- -- --

const studentService = require(path.join(__dirname, 'service/StudentService'));
const professorService = require(path.join(__dirname, 'service/ProfessorService'));


//-- -- -- -- -- -- -- -- -- -- --
// SCHEMA VALIDATOR INITIALIZATION
//-- -- -- -- -- -- -- -- -- -- --

const applicationSchema = JSON.parse(fs.readFileSync(path.join('.', 'json_schema_validator', 'application.json')).toString());
const thesisProposalSchema = JSON.parse(fs.readFileSync(path.join('.', 'json_schema_validator', 'thesisProposal.json')).toString());

const validator = new Validator({ allErrors: true });
validator.ajv.addSchema([applicationSchema, thesisProposalSchema]);
addFormats(validator.ajv);

const validate = validator.validate;


//-- -- -- -- -- -- -- -- -- -- 
// SWAGGER ROUTER CONFIGURATION
//-- -- -- -- -- -- -- -- -- --

const options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

const expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
const app = expressAppConfig.getApp();


//-- -- -- -- -- -- -- --
// SERVER INITIALIZATION
//-- -- -- -- -- -- -- --

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false
}));
app.use(morgan('dev'));
app.use(cors({
    origin: configCors.corsConfig,
    credentials: true
}));


//-- -- -- -- -- -- -- -- --
// PASSPORT INITIALIZATION
//-- -- -- -- -- -- -- -- --

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));

/**
 * Definition of passport strategy
 * for authenticate users into the 
 * application
 */
const strategy = new saml(
    {
        entryPoint: process.env.SAML_ENTRY_POINT,
        issuer: process.env.SAML_ISSUER,
        protocol: process.env.SAML_PROTOCOL,
        logoutUrl: process.env.SAML_LOGOUT_URL,
        cert: fs.readFileSync('./certs/idp_cert.pem', 'utf-8')
    },
    async (profile, done) => {
        let userEmail = profile.attributes['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
        let regex = new RegExp('.*@studenti.*');
        let user;

        if (regex.test(userEmail)) { //user is a student
            try {
                user = await studentService.getStudentByEmail(userEmail);
                done(null, user);
            } catch (error) {
                done(null, false);
            }
        } else { //user is a professor
            try {
                user = await professorService.getProfessorByEmail(userEmail);
                done(null, user);
            } catch (error) {
                done(null, false);
            }
        }
    }
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(strategy);


//-- -- -- -- -- -- -- -- --
// AUTHENTICATION MIDDLEWARE
//-- -- -- -- -- -- -- -- --

/**
 * Verify if the user that want to accede 
 * to the application is logged, if not 
 * he is redirected to the IDP login page
*/
const redirectToLogin = (req, res, next) => {
    if (!req.isAuthenticated() || req.user == null) {
        return res.redirect('/api/authenticatedSession');
    } else {
        return next();
    }
};

/**
 * Verify if the user that want to accede
 * to a specific resorce is correctly logged
 */
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.status(401).json({ error: 'Not authorized' });
    }
}

/**
 * Verify if the user that want to accede
 * to a specific resorce has the role of 
 * student
 */
const isStudent = (req, res, next) => {
    if (req.user.userId != undefined && req.user.codDegree != undefined && req.user.role != undefined) {
        if (req.user.role === 'student') {
            return next();
        }
    }

    return res.status(403).json({ error: 'Forbidden' });
}

/**
 * Verify if the user that want to accede
 * to a specific resorce has the role of 
 * professor
 */
const isProfessor = (req, res, next) => {
    if (req.user.userId != undefined && req.user.codGroup != undefined && req.user.role != undefined) {
        if (req.user.role === 'professor') {
            return next();
        }
    }

    return res.status(403).json({ error: 'Forbidden' });
}


//-- -- -- --
// API ROUTES
//-- -- -- --

/* LOGIN/LOGOUT API */
app.get('/api/app', redirectToLogin, (req, res) => {
    res.redirect(configCors.redirectUrl);
});
app.get('/api/authenticatedSession',
    passport.authenticate('saml', {
        successRedirect: '/api/app',
        failureRedirect: '/api/authenticatedSession'
    })
);
app.get('/api/authenticatedSession/current', isLoggedIn, (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json(req.user);
    } else {
        res.status(401).json({ error: 'Not authorized' });
    }
});
app.get('/api/authenticatedSession/:userId', isLoggedIn, (req, res) => {
    if (req.user == null) {
        return res.redirect('/api/authenticatedSession');
    }

    if (req.params.userId == undefined || req.params.userId != req.user.userId) {
        res.status(403).send('Forbidden');
    } else {
        return strategy.logout(req, (err, uri) => {
            req.logout(() => { res.redirect(uri); });
        });
    }
});
app.get('/api/authenticatedSession/failed', (req, res) => {
    res.status(401).send('Login failed');
});
app.post('/saml/consume',
    passport.authenticate('saml', {
        failureRedirect: '/api/authenticatedSession/failed',
        failureFlash: true
    }),
    (req, res) => { //login success redirect to application
        return res.redirect('/api/app');
    }
);


/* CAREER API */
app.get('/api/careers/:studentId', isLoggedIn, isProfessor, CareerController.getCareer);

/* THESIS PROPOSALS API */
app.get('/api/thesisProposals', isLoggedIn, thesisProposalController.getThesisProposals);
app.get('/api/thesisProposals/:thesisProposalId', isLoggedIn, thesisProposalController.getThesisProposalById);
app.post('/api/thesisProposals', isLoggedIn, isProfessor, validate({ body: thesisProposalSchema }), thesisProposalController.insertNewThesisProposal);
app.put('/api/thesisProposals/:thesisProposalId', isLoggedIn, isProfessor, validate({ body: thesisProposalSchema }), thesisProposalController.updateThesisProposal);
app.delete('/api/thesisProposals/:thesisProposalId', isLoggedIn, isProfessor, thesisProposalController.deleteThesisProposal);


/* APPLICATIONS API */
app.get('/api/applications', isLoggedIn, applicationController.getApplications);
app.get('/api/applications/:thesisProposalId/:studentId', isLoggedIn, applicationController.getApplicationById);
app.post('/api/thesisProposals/:thesisProposalId', isLoggedIn, isStudent, validate({ body: applicationSchema }), applicationController.insertNewApplication);
app.put('/api/applications/:thesisProposalId/:studentId', isLoggedIn, isProfessor, validate({ body: applicationSchema }), applicationController.updateApplication);


/* STUDENTS API */
app.get('/api/students/:studentId', isLoggedIn, studentController.getStudentById);


/* PROFESSORS API */
app.get('/api/professors', isLoggedIn, professorController.getProfessors);
app.get('/api/professors/:professorId', isLoggedIn, professorController.getProfessorById);


/* EXTERNAL CO-SUPERVISORS API */
app.get('/api/externalCoSupervisors', isLoggedIn, externalCoSupervisorController.getExternalCoSupervisors);
app.get('/api/externalCoSupervisors/:externalCoSupervisorId', isLoggedIn, externalCoSupervisorController.getExternalCoSupervisorById);


/* KEYWORDS API */
app.get('/api/keywords', isLoggedIn, keywordController.getKeywords);


/* DEGREES API */
app.get('/api/degrees', isLoggedIn, degreeController.getDegrees);


/* CV API */
app.post('/api/cv', isLoggedIn, isStudent, curriculumVitaeController.insertNewCV);
app.get('/api/cv/:studentId', isLoggedIn, curriculumVitaeController.getCV);


//-- -- -- -- --
// SERVER START
//-- -- -- -- --

app.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
        res.status(400).send(err);
    } else next(err);
});

const httpServer = http.createServer(app);
httpServer.timeout = 300000;

httpServer.listen(PORT, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', PORT, PORT);
    console.log('Swagger-ui is available on http://localhost:%d/docs', PORT);
});
