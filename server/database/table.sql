/* TABLE TO MANAGE PROFESSORS */
DROP TABLE IF EXISTS professors;
CREATE TABLE professors(
    professorId TEXT(7) PRIMARY KEY NOT NULL,
    name TEXT(20) NOT NULL,
    surname TEXT(20) NOT NULL,
    email TEXT(50) NOT NULL,
    codGroup TEXT(20) NOT NULL,
    codDepartment TEXT(20) NOT NULL
);

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* TABLE TO MANAGE STUDENTS */
DROP TABLE IF EXISTS students;
CREATE TABLE students(
    studentId TEXT(7) PRIMARY KEY NOT NULL,
    name TEXT(20) NOT NULL,
    surname TEXT(20) NOT NULL,
    gender TEXT(20) NOT NULL,
    email TEXT(50) NOT NULL,
    nationality TEXT(20) NOT NULL,
    codDegree TEXT(20) NOT NULL,
    enrollmentYear INTEGER NOT NULL
);

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* TABLE TO MANAGE EXTERNAL CO-SUPERVISORS */
DROP TABLE IF EXISTS externalCoSupervisors;
CREATE TABLE externalCoSupervisors(
    externalCoSupervisorId TEXT(7) PRIMARY KEY NOT NULL,
    name TEXT(20) NOT NULL,
    surname TEXT(20) NOT NULL,
    company TEXT(20) NOT NULL,
    email TEXT(50) NOT NULL
);

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* TABLE TO MANAGE SECRETARY CLERCK EMPLOYEE */
DROP TABLE IF EXISTS secretaryClerckEmployees;
CREATE TABLE secretaryClerckEmployees(
    secretaryClerckEmployeeId TEXT(7) PRIMARY KEY NOT NULL,
    name TEXT(20) NOT NULL,
    surname TEXT(20) NOT NULL,
    email TEXT(50) NOT NULL
);

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* TABLE TO MANAGE DEGREES */
DROP TABLE IF EXISTS degrees;
CREATE TABLE degrees(
    degreeId TEXT(20) PRIMARY KEY NOT NULL,
    titleDegree TEXT(20) NOT NULL
);

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* TABLE TO MANAGE STUDENT PASSED EXAMS */
DROP TABLE IF EXISTS careers;
CREATE TABLE careers(
    studentId TEXT(7) NOT NULL,
    codCourse TEXT(7) NOT NULL,
    titleCourse TEXT(30) NOT NULL,
    cfu INTEGER NOT NULL,
    grade INTEGER NOT NULL,
    date DATE NOT NULL,
    
	PRIMARY KEY(studentId, codCourse),
    FOREIGN KEY(studentId) REFERENCES students(studentId) ON DELETE CASCADE
);

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* TABLE TO MANAGE THESIS PROPOSALS */
DROP TABLE IF EXISTS thesisProposals;
CREATE TABLE thesisProposals(
    thesisProposalId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    title TEXT(20) NOT NULL,
    supervisor TEXT(7) NOT NULL,
    keywords TEXT(100) NOT NULL,
    description TEXT(1000) NOT NULL,
    requirements TEXT(1000) NOT NULL,
    thesisType TEXT(20) NOT NULL,
    abroad BOLEAN NOT NULL,
    notes TEXT(500),
    expirationDate DATE NOT NULL,
    level TEXT(20) NOT NULL,
    isArchieved BOLEAN DEFAULT FALSE NOT NULL,
    
    FOREIGN KEY(supervisor) REFERENCES professors(professorId) ON UPDATE CASCADE ON DELETE CASCADE
);

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* TABLE TO MANAGE STUDENT APPLICATIONS FOR THESIS PROPOSALS */
DROP TABLE IF EXISTS applications;
CREATE TABLE applications(
    thesisProposalId INTEGER NOT NULL,
    studentId TEXT(7) NOT NULL,
    message TEXT(1000),
    date DATE NOT NULL,
    status TEXT(20) NOT NULL DEFAULT 'Pending',
    
    PRIMARY KEY(thesisProposalId, studentId),
    FOREIGN KEY(studentId) REFERENCES students(studentId) ON UPDATE CASCADE ON DELETE CASCADE
);

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* TABLE TO MANAGE THE LIST OF INTERNAL CO-SUPERVISOR FOR A THESIS PROPOSAL */
DROP TABLE IF EXISTS thesisProposal_internalCoSupervisor_bridge;
CREATE TABLE thesisProposal_internalCoSupervisor_bridge(
    thesisProposalId INTEGER NOT NULL,
    internalCoSupervisorId TEXT(7) NOT NULL,
    
    PRIMARY KEY(thesisProposalId, internalCoSupervisorId),
    FOREIGN KEY(thesisProposalId) REFERENCES thesisProposals(thesisProposalId) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(internalCoSupervisorId) REFERENCES professors(professorId)
);

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* TABLE TO MANAGE THE LIST OF EXTERNAL CO-SUPERVISOR FOR A THESIS PROPOSAL */
DROP TABLE IF EXISTS thesisProposal_externalCoSupervisor_bridge;
CREATE TABLE thesisProposal_externalCoSupervisor_bridge(
    thesisProposalId INTEGER NOT NULL,
    externalCoSupervisorId TEXT(7) NOT NULL,
    
    PRIMARY KEY(thesisProposalId, externalCoSupervisorId),
    FOREIGN KEY(thesisProposalId) REFERENCES thesisProposals(thesisProposalId) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(externalCoSupervisorId) REFERENCES externalCoSupervisors(externalCoSupervisorId)
);

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* TABLE TO MANAGE THE LIST OF TITLE CDS FOR A THESIS PROPOSAL */
DROP TABLE IF EXISTS thesisProposal_cds_bridge;
CREATE TABLE thesisProposal_cds_bridge(
    thesisProposalId INTEGER NOT NULL,
    cdsId INTEGER NOT NULL,
    
    PRIMARY KEY(thesisProposalId, cdsId),
    FOREIGN KEY(thesisProposalId) REFERENCES thesisProposals(thesisProposalId) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(cdsId) REFERENCES degrees(degreeId)
);

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* TABLE TO PERFORM FULL TABLE TEXT SEARCH */
DROP TABLE IF EXISTS virtualThesisProposals;
CREATE VIRTUAL TABLE virtualThesisProposals USING fts5(
    thesisProposalId,
    title,
    keywords,
    description,
    requirements,
    thesisType,
    notes
);

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* TABLE TO MANAGE THESIS REQUESTS */
DROP TABLE IF EXISTS thesisRequests;
CREATE TABLE thesisRequests(
    thesisRequestId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	thesisProposalId INTEGER DEFAULT NULL,
    studentId TEXT(7) NOT NULL,
	title TEXT(20) NOT NULL,
    supervisor TEXT(7) NOT NULL,
    description TEXT(1000) NOT NULL,
    secretaryStatus TEXT(20) NOT NULL DEFAULT 'Pending',
	professorStatus TEXT(20) NOT NULL DEFAULT 'Pending',
    date DATE NOT NULL,
	approvalDate DATE DEFAULT NULL,
    
	FOREIGN KEY(thesisProposalId) REFERENCES thesisProposals(thesisProposalId) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(supervisor) REFERENCES professors(professorId) ON UPDATE CASCADE ON DELETE CASCADE
);

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* TABLE TO MANAGE THE LIST OF INTERNAL CO-SUPERVISOR FOR A THESIS PROPOSAL */
DROP TABLE IF EXISTS thesisRequest_internalCoSupervisor_bridge;
CREATE TABLE thesisRequest_internalCoSupervisor_bridge(
    thesisRequestId INTEGER NOT NULL,
    internalCoSupervisorId TEXT(7) NOT NULL,

    PRIMARY KEY(thesisRequestId, internalCoSupervisorId),
    FOREIGN KEY(thesisRequestId) REFERENCES thesisRequests(thesisRequestId) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(internalCoSupervisorId) REFERENCES professors(professorId)
);

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* TABLE TO MANAGE THE NOTIFICATIONS */
DROP TABLE IF EXISTS notifications;
CREATE TABLE notifications(
	notificationId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	userId TEXT(7) NOT NULL,
	message TEXT(100) NOT NULL,
	date DATE NOT NULL,
	type INTEGER NOT NULL,
	isRead BOLEAN DEFAULT FALSE NOT NULL
);
