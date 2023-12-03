/* TABLE TO MANAGE PROFESSORS */
DROP TABLE professors;
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
DROP TABLE students;
CREATE TABLE students(
    studentId TEXT(7) PRIMARY KEY NOT NULL,
    name TEXT(20) NOT NULL,
    surname TEXT(20) NOT NULL,
    gender TEXT(20) NOT NULL,
    email TEXT(50) NOT NULL,
    nationality TEXT(20) NOT NULL,
    codDegree TEXT(20) NOT NULL,
    enrollmentYear INTEGER NOT NULL,
    cv TEXT(100)
);

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* TABLE TO MANAGE EXTERNAL CO-SUPERVISORS */
DROP TABLE externalCoSupervisors;
CREATE TABLE externalCoSupervisors(
    externalCoSupervisorId TEXT(7) PRIMARY KEY NOT NULL,
    name TEXT(20) NOT NULL,
    surname TEXT(20) NOT NULL,
    company TEXT(20) NOT NULL,
    email TEXT(50) NOT NULL
);

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* TABLE TO MANAGE DEGREES */
DROP TABLE degrees;
CREATE TABLE degrees(
    degreeId TEXT(20) PRIMARY KEY NOT NULL,
    titleDegree TEXT(20) NOT NULL
);

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* TABLE TO MANAGE STUDENT PASSED EXAMS */
DROP TABLE careers;
CREATE TABLE careers(
    studentId TEXT(7) PRIMARY KEY NOT NULL,
    codCourse TEXT(7) NOT NULL,
    titleCourse TEXT(30) NOT NULL,
    cfu INTEGER NOT NULL,
    garde INTEGER NOT NULL,
    date DATE NOT NULL,
    
    FOREIGN KEY(studentId) REFERENCES students(studentId)
);

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* TABLE TO MANAGE THESIS PROPOSALS */
DROP TABLE thesisProposals;
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
    isArchieved BOLEAN DEFAULT TRUE NOT NULL,
    
    FOREIGN KEY(supervisor) REFERENCES professors(professorId) ON UPDATE CASCADE ON DELETE CASCADE
);

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* TABLE TO MANAGE STUDENT APPLICATIONS FOR THESIS PROPOSALS */
DROP TABLE applications;
CREATE TABLE applications(
    thesisProposalId INTEGER NOT NULL,
    studentId TEXT(7) NOT NULL,
    message TEXT(1000),
    date DATE NOT NULL,
    isReadedByProfessor BOLEAN DEFAULT FALSE NOT NULL,
    isReadedByStudent BOLEAN DEFAULT FALSE NOT NULL,
    status TEXT(20) NOT NULL DEFAULT 'Pending',
    
    PRIMARY KEY(thesisProposalId, studentId),
    FOREIGN KEY(thesisProposalId) REFERENCES thesisProposals(thesisProposalId) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(studentId) REFERENCES students(studentId)
);

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* TABLE TO MANAGE THE LIST OF INTERNAL CO-SUPERVISOR FOR A THESIS PROPOSAL */
DROP TABLE thesisProposal_internalCoSupervisor_bridge;
CREATE TABLE thesisProposal_internalCoSupervisor_bridge(
    thesisProposalId INTEGER NOT NULL,
    internalCoSupervisorId TEXT(7) NOT NULL,
    
    PRIMARY KEY(thesisProposalId, internalCoSupervisorId),
    FOREIGN KEY(thesisProposalId) REFERENCES thesisProposals(thesisProposalId) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(internalCoSupervisorId) REFERENCES professors(professorId)
);

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* TABLE TO MANAGE THE LIST OF EXTERNAL CO-SUPERVISOR FOR A THESIS PROPOSAL */
DROP TABLE thesisProposal_externalCoSupervisor_bridge;
CREATE TABLE thesisProposal_externalCoSupervisor_bridge(
    thesisProposalId INTEGER NOT NULL,
    externalCoSupervisorId TEXT(7) NOT NULL,
    
    PRIMARY KEY(thesisProposalId, externalCoSupervisorId),
    FOREIGN KEY(thesisProposalId) REFERENCES thesisProposals(thesisProposalId) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(externalCoSupervisorId) REFERENCES externalCoSupervisors(externalCoSupervisorId)
);

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* TABLE TO MANAGE THE LIST OF TITLE CDS FOR A THESIS PROPOSAL */
DROP TABLE thesisProposal_cds_bridge;
CREATE TABLE thesisProposal_cds_bridge(
    thesisProposalId INTEGER NOT NULL,
    cdsId INTEGER NOT NULL,
    
    PRIMARY KEY(thesisProposalId, cdsId),
    FOREIGN KEY(thesisProposalId) REFERENCES thesisProposals(thesisProposalId) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(cdsId) REFERENCES degrees(degreeId)
);

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* TABLE TO PERFORM FULL TABLE TEXT SEARCH */
DROP TABLE virtualThesisProposals;
CREATE VIRTUAL TABLE virtualThesisProposals USING fts5(
    thesisProposalId,
    title,
    keywords,
    description,
    requirements,
    thesisType,
    notes
);
