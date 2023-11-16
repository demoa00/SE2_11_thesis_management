'use strict';

const path = require('path');
const http = require('http');
const cors = require('cors');
const fs = require('fs');
const oas3Tools = require('oas3-tools');
const { Validator, ValidationError } = require('express-json-validator-middleware');
const passport = require('passport');
const session = require('express-session');

const serverPort = 3001;

const applicationController = require(path.join(__dirname, 'controllers/Application'));
const externalCoSupervisorController = require(path.join(__dirname, 'controllers/ExternalCoSupervisor'));
const professorController = require(path.join(__dirname, 'controllers/Professor'));
const studentController = require(path.join(__dirname, 'controllers/Student'));
const thesisProposalController = require(path.join(__dirname, 'controllers/ThesisProposal'));
const userController = require(path.join(__dirname, 'controllers/User'));

/////////////////////////////////////////////////////////
// Set up and enable Cross-Origin Resource Sharing (CORS)
/////////////////////////////////////////////////////////

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};


////////////
// Passport
////////////

// Serializing in the session the user object given from LocalStrategy(verify).
passport.serializeUser(function (user, cb) { // this user is id + username + name 
    cb(null, user);
});

// Starting from the data in the session, we extract the current (logged-in) user.
passport.deserializeUser(function (user, cb) { // this user is id + email + name 
    // if needed, we can do extra check here (e.g., double check that the user is still in the database, etc.)
    // e.g.: return userDao.getUserById(id).then(user => cb(null, user)).catch(err => cb(err, null));
    return cb(null, user); // this will be available in req.user
});

// Defining authentication verification middleware
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ error: 'Not authorized' });
}


/////////////////////////////////////
// Defining JSON validator middleware
/////////////////////////////////////

const addFormats = require('ajv-formats').default;

const applicationSchema = JSON.parse(fs.readFileSync(path.join('.', 'json_schema_validator', 'application.json')).toString());
const thesisProposalSchema = JSON.parse(fs.readFileSync(path.join('.', 'json_schema_validator', 'thesisProposal.json')).toString());
const userCredentialsSchema = JSON.parse(fs.readFileSync(path.join('.', 'json_schema_validator', 'userCredentials.json')).toString());

const validator = new Validator({ allErrors: true });
validator.ajv.addSchema([applicationSchema, thesisProposalSchema, userCredentialsSchema]);
addFormats(validator.ajv);

const validate = validator.validate;


//////////////////////////////
// swaggerRouter configuration
//////////////////////////////

const options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

const expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
const app = expressAppConfig.getApp();


///////////////////////
// Creating the session
///////////////////////

app.use(cors(corsOptions));
app.use(session({
    secret: "shhhhh... it's a secret!",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.authenticate('session'));


////////////////
//Route methods
////////////////

//Login
app.post('/api/authenticatedSession', validate({ body: userCredentialsSchema }), userController.createNewAuthenticatedSession);
app.delete('/api/authenticatedSession/:userId', isLoggedIn, userController.deleteAuthenticatedSession);

//Thesis proposals
app.get('/api/professors/:professorId/thesisProposals', isLoggedIn, thesisProposalController.getThesisProposalsOfProfessor);
app.post('/api/professors/:professorId/thesisProposals', validate({ body: thesisProposalSchema }), thesisProposalController.insertNewThesisProposal); //WORK IN PROGRESS

//Professors
app.get('/api/professors', isLoggedIn, professorController.getProfessors);
app.get('/api/professors/:professorId', isLoggedIn, professorController.getProfessorById);

//External co-supervisors
app.get('/api/externalCoSupervisors', isLoggedIn, externalCoSupervisorController.getExternalCoSupervisors);
app.get('/api/externalCoSupervisors/:externalCoSupervisorId', isLoggedIn, externalCoSupervisorController.getExternalCoSupervisorById);

////////////////////////////////
// Error handlers for validation
////////////////////////////////

app.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
        res.status(400).send(err);
    } else next(err);
});


/////////////////////////////////////
// Initialize the Swagger middleware
/////////////////////////////////////

http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});




// Thesis Proposal Table Functions:

app.post('/api/professors/{professorId}/thesisProposals', isLoggedIn, [
    //TODO: insert Express validator functions
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(422).json({ errors: errors.array() });
    } else {
        try {
            const newThesisProposal = {
                title: req.body.title,
                coSupervisors: req.body.coSupervisors,
                keywords: JSON.stringify(req.body.keywords),
                thesisType: req.body.thesisType,
                abroad: req.body.abroad,
                description: req.body.description,
                requirements: req.body.requirements,
                expirationDate: req.body.expirationDate,
                level: req.body.level
            }
            const newThesis = await thesisProposalController.insertNewThesisProposal(req.user.id, newThesisProposal);
            res.json(newThesis);
        } catch (err) {
            console.log(err)
            res.status(503).json({ error: `Database error during the add of the thesis proposal  ${req.params.id}.` });
        }
    }
});

app.get('api/thesisProposals', (req, res) => {
    thesisProposalController.getThesisProposals(
        req.user.id,
        req.body.keywords,
        req.body.supervisor,
        req.body.title,
        req.body.thesisType,
        req.body.abroad,
        req.bodyexpirationDate
    )
        .then(thesis => res.json(thesis))
        .catch(() => res.status(500).end());
});