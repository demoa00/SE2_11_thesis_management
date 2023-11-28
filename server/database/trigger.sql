/* TRIGGER TO PERFORM AUTOMATIC INSERT ON VIRTUAL TABLE AFTER INSERT ON TABLE FOR THESIS PROPOSALS */
DROP TRIGGER insertVirtual;
CREATE TRIGGER insertVirtual AFTER INSERT ON thesisProposals
BEGIN
    INSERT INTO virtualThesisProposals(thesisProposalId, title, keywords, description, requirements, thesisType, notes) VALUES(NEW.thesisProposalId, NEW.title, NEW.keywords, NEW.description, NEW.requirements, NEW.thesisType, NEW.notes);
END;

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* TRIGGER TO PERFORM AUTOMATIC UPDATE VIRTUAL TABLE AFTER UPDATE TABLE FOR THESIS PROPOSALS */
DROP TRIGGER updateVirtual;
CREATE TRIGGER updateVirtual AFTER UPDATE ON thesisProposals
BEGIN
    UPDATE virtualThesisProposals SET title = NEW.title, keywords = NEW.keywords, description = NEW.description, requirements = NEW.requirements, thesisType = NEW.thesisType, notes = NEW.notes WHERE thesisProposalId = NEW.thesisProposalId;
END;

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* TRIGGER TO PERFORM AUTOMATIC DELETE ON VIRTUAL TABLE AFTER DELETE ON TABLE FOR THESIS PROPOSALS */
DROP TRIGGER deleteVirtual;
CREATE TRIGGER deleteVirtual AFTER DELETE ON thesisProposals
BEGIN
    DELETE FROM virtualThesisProposals WHERE thesisProposalId = OLD.thesisProposalId;
END;

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* TRIGGER TO PERFORM AUTOMATIC DELETE ON BRIDGE TABLES AFTER UPDATE ON TABLE FOR THESIS PROPOSALS */
DROP TRIGGER deleteBridgeOnUpdate;
CREATE TRIGGER deleteBridgeOnUpdate AFTER UPDATE ON thesisProposals
BEGIN
    DELETE FROM thesisProposal_externalCoSupervisor_bridge WHERE thesisProposalId = OLD.thesisProposalId;
    DELETE FROM thesisProposal_internalCoSupervisor_bridge WHERE thesisProposalId = OLD.thesisProposalId;
    DELETE FROM thesisProposal_cds_bridge WHERE thesisProposalId = OLD.thesisProposalId;
END;
