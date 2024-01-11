/* DEGREES DATA */
DELETE FROM degrees;
INSERT INTO degrees (degreeId, titleDegree) VALUES ('L-1', 'Bachelor in Mechanical Engineering');
INSERT INTO degrees (degreeId, titleDegree) VALUES ('LM-9', 'Master in Software Engineering');
INSERT INTO degrees (degreeId, titleDegree) VALUES ('L-4', 'Bachelor of Science in Civil Engineering');
INSERT INTO degrees (degreeId, titleDegree) VALUES ('LM-78', 'Master in Mechatronics Engineering');
INSERT INTO degrees (degreeId, titleDegree) VALUES ('L-25', 'Bachelor in Chemical Engineering');
INSERT INTO degrees (degreeId, titleDegree) VALUES ('LM-7', 'Master in Automation engineering');
INSERT INTO degrees (degreeId, titleDegree) VALUES ('L-5', 'Bachelor in Aerospace Engineering');
INSERT INTO degrees (degreeId, titleDegree) VALUES ('LM-18', 'Master in Environmental Engineering');
INSERT INTO degrees (degreeId, titleDegree) VALUES ('L-2', 'Bachelor in Materials Engineering');
INSERT INTO degrees (degreeId, titleDegree) VALUES ('LM-58', 'Master in Manufacturing Engineering');
INSERT INTO degrees (degreeId, titleDegree) VALUES ('L-34', 'Bachelor in Geological Engineering');
INSERT INTO degrees (degreeId, titleDegree) VALUES ('LM-5', 'Master in Naval Architecture and Marine Engineering');
INSERT INTO degrees (degreeId, titleDegree) VALUES ('L-45', 'Bachelor in Biomedical Engineering');
INSERT INTO degrees (degreeId, titleDegree) VALUES ('LM-10', 'Master in Electronic Engineering');
INSERT INTO degrees (degreeId, titleDegree) VALUES ('L-6', 'Bachelor in Computer Science Engineering');
INSERT INTO degrees (degreeId, titleDegree) VALUES ('LM-13', 'Master in Management Engineering');

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* STUDENTS DATA */
DELETE FROM students;
INSERT INTO students (studentId, name, surname, gender, nationality, email, codDegree, enrollmentYear) VALUES ('s123456', 'John', 'Smith', 'male', 'Italian', 's123456@studenti.polito.it', 'L-1', 2023);
INSERT INTO students (studentId, name, surname, gender, nationality, email, codDegree, enrollmentYear) VALUES ('s789012', 'Jane', 'Brown', 'female', 'American', 's789012@studenti.polito.it', 'LM-13', 2022);
INSERT INTO students (studentId, name, surname, gender, nationality, email, codDegree, enrollmentYear) VALUES ('s987654', 'Peter', 'Williams', 'male', 'British', 's987654@studenti.polito.it', 'L-6', 2021);
INSERT INTO students (studentId, name, surname, gender, nationality, email, codDegree, enrollmentYear) VALUES ('s345678', 'Mary', 'Johnson', 'female', 'Canadian', 's345678@studenti.polito.it', 'LM-9', 2020);
INSERT INTO students (studentId, name, surname, gender, nationality, email, codDegree, enrollmentYear) VALUES ('s012345', 'David', 'Davis', 'male', 'Australian', 's012345@studenti.polito.it', 'L-25', 2019);
INSERT INTO students (studentId, name, surname, gender, nationality, email, codDegree, enrollmentYear) VALUES ('s654321', 'Alice', 'Taylor', 'female', 'French', 's654321@studenti.polito.it', 'LM-9', 2018);
INSERT INTO students (studentId, name, surname, gender, nationality, email, codDegree, enrollmentYear) VALUES ('s876543', 'Bob', 'Wilson', 'male', 'German', 's876543@studenti.polito.it', 'LM-9', 2017);
INSERT INTO students (studentId, name, surname, gender, nationality, email, codDegree, enrollmentYear) VALUES ('s456789', 'Emily', 'Davis', 'female', 'Spanish', 's456789@studenti.polito.it', 'LM-7', 2016);
INSERT INTO students (studentId, name, surname, gender, nationality, email, codDegree, enrollmentYear) VALUES ('s234567', 'Michael', 'Rodriguez', 'male', 'Chinese', 's234567@studenti.polito.it', 'L-4', 2015);
INSERT INTO students (studentId, name, surname, gender, nationality, email, codDegree, enrollmentYear) VALUES ('s098765', 'Jessica', 'Lee', 'female', 'Indian', 's098765@studenti.polito.it', 'L-2', 2014);

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* PROFESSORS DATA */
DELETE FROM professors;
INSERT INTO professors (professorId, name, surname, email, codGroup, codDepartment) VALUES ('p987123', 'Elizabeth', 'Lopez', 'elizabeth.lopez@polito.it', 'CG_23', 'CD_23');
INSERT INTO professors (professorId, name, surname, email, codGroup, codDepartment) VALUES ('p456789', 'James', 'Rodriguez', 'james.rodriguez@polito.it', 'CG_22', 'CD_22');
INSERT INTO professors (professorId, name, surname, email, codGroup, codDepartment) VALUES ('p123098', 'Robert', 'Clark', 'robert.clark@polito.it', 'CG_21', 'CD_21');
INSERT INTO professors (professorId, name, surname, email, codGroup, codDepartment) VALUES ('p654321', 'Barbara', 'Martin', 'barbara.martin@polito.it', 'CG_20', 'CD_20');
INSERT INTO professors (professorId, name, surname, email, codGroup, codDepartment) VALUES ('p321098', 'Susan', 'Jackson', 'susan.jackson@polito.it', 'CG_10', 'CD_19');
INSERT INTO professors (professorId, name, surname, email, codGroup, codDepartment) VALUES ('p456987', 'Mark', 'Wilson', 'mark.wilson@polito.it', 'CG_08', 'CD_17');
INSERT INTO professors (professorId, name, surname, email, codGroup, codDepartment) VALUES ('p123654', 'Richard', 'Davis', 'richard.davis@polito.it', 'CG_07', 'CD_16');
INSERT INTO professors (professorId, name, surname, email, codGroup, codDepartment) VALUES ('p987456', 'Emily', 'Johnson', 'emily.johnson@polito.it', 'CG_06', 'CD_15');
INSERT INTO professors (professorId, name, surname, email, codGroup, codDepartment) VALUES ('p321654', 'David', 'Miller', 'david.miller@polito.it', 'CG_05', 'CD_14');
INSERT INTO professors (professorId, name, surname, email, codGroup, codDepartment) VALUES ('p789012', 'Mary', 'Brown', 'mary.brown@polito.it', 'CG_04', 'CD_13');
INSERT INTO professors (professorId, name, surname, email, codGroup, codDepartment) VALUES ('p695310', 'Michael', 'Williams', 'michael.williams@polito.it', 'CG_25', 'CD_26');
INSERT INTO professors (professorId, name, surname, email, codGroup, codDepartment) VALUES ('p271846', 'Sandra', 'Bullock', 'sandra.brown@polito.it', 'CG_27', 'CD_28');
INSERT INTO professors (professorId, name, surname, email, codGroup, codDepartment) VALUES ('p540287', 'Anthony', 'Taylor', 'anthony.taylor@polito.it', 'CG_29', 'CD_30');
INSERT INTO professors (professorId, name, surname, email, codGroup, codDepartment) VALUES ('p106398', 'Barbara', 'Garcia', 'barbara.garcia@polito.it', 'CG_31', 'CD_32');

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* EXTERNAL CO-SUPERVISORS DATA */
DELETE FROM externalCoSupervisors;
INSERT INTO externalCoSupervisors (externalCoSupervisorId, name, surname, email, company) VALUES ('e456789', 'Patricia', 'Rodriguez', 'patriciarodriguez@example.net', 'Apex Technologies');
INSERT INTO externalCoSupervisors (externalCoSupervisorId, name, surname, email, company) VALUES ('e678901', 'Robert', 'Johnson', 'robertjohnson@example.co.uk', 'Zenith Innovations');
INSERT INTO externalCoSupervisors (externalCoSupervisorId, name, surname, email, company) VALUES ('e890123', 'Jennifer', 'Wilson', 'jenniferwilson@example.io', 'Vertex Solutions');
INSERT INTO externalCoSupervisors (externalCoSupervisorId, name, surname, email, company) VALUES ('e987654', 'Peter', 'Jones', 'peterjones@example.net', 'ABC Enterprises');
INSERT INTO externalCoSupervisors (externalCoSupervisorId, name, surname, email, company) VALUES ('e654321', 'Jane', 'Smith', 'janesmith@example.org', 'XYZ Technologies');

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* SECRETARY CLERCK EMPLOYEES DATA */
DELETE FROM secretaryClerckEmployees;
INSERT INTO secretaryClerckEmployees (secretaryClerckEmployeeId, name, surname, email) VALUES ('c123456', 'Tony', 'Jordan', 'tony.jordan@polito.it');

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* THESIS PROPOSALS DATA */
DELETE FROM thesisProposals;
INSERT INTO thesisProposals (thesisProposalId, title, supervisor, keywords, description, requirements, thesisType, abroad, notes, expirationDate, level, isArchieved) VALUES (1, 'Design and Analysis of a Solar-Powered Water Pump for Rural Communities', 'p987123', '["solar energy","water pumping","rural communities"]', 'This thesis proposal aims to design and analyze a solar-powered water pump system for rural communities with limited access to electricity. The system will utilize solar panels to generate electricity, which will then be used to power a water pump to provide clean drinking water to the community.', 'The student should have a strong understanding of mechanical engineering principles, including thermodynamics, fluid mechanics, and electrical engineering. The student should also be proficient in using CAD software and have experience with data analysis.', 'Research', false, 'This thesis proposal is open to students interested in renewable energy, water resources, and sustainable development.', '2024-06-30', 'BSc', false);
INSERT INTO thesisProposals (thesisProposalId, title, supervisor, keywords, description, requirements, thesisType, abroad, notes, expirationDate, level, isArchieved) VALUES (2, 'Development of a Biomechanical Model for Predicting Musculoskeletal Injuries in Athletes', 'p456789', '["biomechanics","musculoskeletal injuries","athletes"]', 'This thesis proposal aims to develop a biomechanical model to predict musculoskeletal injuries in athletes. The model will be based on the analysis of motion capture data and muscle activity data. The model will be used to identify athletes at risk of injury and to develop training programs to prevent injuries.', 'The student should have a strong understanding of biomechanics, anatomy, and physiology. The student should also be proficient in using motion capture software and have experience with data analysis.', 'Research', false, 'This thesis proposal is open to students interested in biomechanics, sports science, and injury prevention.', '2024-05-31', 'BSc', false);
INSERT INTO thesisProposals (thesisProposalId, title, supervisor, keywords, description, requirements, thesisType, abroad, notes, expirationDate, level, isArchieved) VALUES (3, 'Optimization of a Wind Turbine Blade Design for Increased Efficiency', 'p987123', '["wind energy","optimization"]', 'This thesis proposal aims to optimize the design of a wind turbine blade to increase its efficiency. The optimization will be based on computational fluid dynamics (CFD) simulations. The optimized blade design will be tested in a wind tunnel to validate its performance.', 'The student should have a strong understanding of fluid mechanics, aerodynamics, and optimization techniques. The student should also be proficient in using CFD software and have experience with wind tunnel testing.', 'In Company', false, 'This thesis proposal is open to students interested in renewable energy, aerodynamics, and computational engineering. The student will have the opportunity to work on a real-world problem with a leading wind turbine manufacturer.', '2024-06-15', 'BSc', false);
INSERT INTO thesisProposals (thesisProposalId, title, supervisor, keywords, description, requirements, thesisType, abroad, notes, expirationDate, level, isArchieved) VALUES (4, 'Development of a Sustainable Process for the Production of Bioplastics', 'p123098', '["bioplastics","sustainability"]', 'This thesis proposal aims to develop a sustainable process for the production of bioplastics from renewable sources. The process will be based on the use of green solvents and catalysts. The produced bioplastics will be characterized for their properties and compared to traditional plastics.', 'The student should have a strong understanding of polymer chemistry, reaction engineering, and sustainability principles. The student should also be proficient in using analytical chemistry techniques and have experience with process design.', 'Research', false, 'This thesis proposal is open to students interested in sustainable materials, bioplastics, and green chemistry.', '2024-06-30', 'BSc', false);
INSERT INTO thesisProposals (thesisProposalId, title, supervisor, keywords, description, requirements, thesisType, abroad, notes, expirationDate, level, isArchieved) VALUES (5, 'Design and Optimization of a Membrane Filtration System for Water Purification', 'p654321', '["water purification","chemical engineering"]', 'This thesis proposal aims to design and optimize a membrane filtration system for water purification. The system will utilize a novel membrane material to remove contaminants from water. The system will be optimized for energy efficiency and water recovery.', 'The student should have a strong understanding of transport phenomena, separation processes, and water treatment technologies. The student should also be proficient in using membrane characterization techniques and have experience with process modeling.', 'In Company', false, 'This thesis proposal is open to students interested in water sustainability, membrane technology, and environmental engineering. The student will have the opportunity to work on a real-world problem with a leading water treatment company.', '2024-05-31', 'BSc', false);
INSERT INTO thesisProposals (thesisProposalId, title, supervisor, keywords, description, requirements, thesisType, abroad, notes, expirationDate, level, isArchieved) VALUES (6, 'Kinetic Study of a Catalytic Reaction for Energy Production', 'p123098', '["energy production"]', 'This thesis proposal aims to investigate the kinetics of a catalytic reaction for energy production. The reaction will be studied using experimental and computational methods. The kinetic data will be used to develop a model for the reaction and to optimize the reaction conditions.', 'The student should have a strong understanding of chemical kinetics, reactor design, and computational chemistry. The student should also be proficient in using laboratory techniques and have experience with kinetic modeling.', 'Research', true, 'This thesis proposal is open to students interested in catalysis, energy systems, and reaction engineering. The student will have the opportunity to conduct research in a world-renowned laboratory abroad.', '2024-06-15', 'BSc', false);
INSERT INTO thesisProposals (thesisProposalId, title, supervisor, keywords, description, requirements, thesisType, abroad, notes, expirationDate, level, isArchieved) VALUES (7, 'Geophysical Investigation of a Potential Geothermal Reservoir', 'p321098', '["geophysics"]', 'This thesis proposal aims to investigate the potential for geothermal energy development in a specific region. The investigation will involve the use of geophysical methods, such as seismic reflection and electrical resistivity tomography, to map the subsurface geology and identify potential geothermal reservoirs.', 'The student should have a strong understanding of geophysical principles, geological structures, and geothermal energy concepts. The student should also be proficient in using geophysical data processing and interpretation software.', 'Research', false, 'This thesis proposal is open to students interested in geothermal energy, geophysics, and geological engineering.', '2024-06-30', 'BSc', false);
INSERT INTO thesisProposals (thesisProposalId, title, supervisor, keywords, description, requirements, thesisType, abroad, notes, expirationDate, level, isArchieved) VALUES (8, 'Hydrogeological Assessment of a Groundwater Resource', 'p321098', '["hydrogeology","groundwater resources"]', 'This thesis proposal aims to assess the sustainability of a groundwater resource in a specific region. The assessment will involve the collection of field data, the analysis of hydrogeological data, and the development of a groundwater model. The model will be used to predict the long-term sustainability of the resource under different scenarios.', 'The student should have a strong understanding of hydrogeological principles, groundwater flow, and water resources management. The student should also be proficient in using hydrogeological modeling software and field data collection techniques.', 'Research', true, 'This thesis proposal is open to students interested in hydrogeology, groundwater resources, and geological engineering. The student will have the opportunity to conduct research in a water-scarce region abroad.', '2024-05-31', 'BSc', false);
INSERT INTO thesisProposals (thesisProposalId, title, supervisor, keywords, description, requirements, thesisType, abroad, notes, expirationDate, level, isArchieved) VALUES (9, 'Geological Characterization of a Mineral Deposit for Mining Operations', 'p321098', '["mineral deposits","mining geology"]', 'This thesis proposal aims to characterize a mineral deposit in a specific region to support mining operations. The characterization will involve geological mapping, sampling, and laboratory analysis. The results of the characterization will be used to develop a geological model of the deposit and to estimate its mineral resources.', 'The student should have a strong understanding of economic geology, mineral deposits, and geological mapping techniques. The student should also be proficient in using geological software and laboratory equipment.', 'In Company', false, 'This thesis proposal is open to students interested in mining geology, economic geology, and geological engineering. The student will have the opportunity to work on a real-world problem with a leading mining company.', '2024-06-15', 'BSc', false);
INSERT INTO thesisProposals (thesisProposalId, title, supervisor, keywords, description, requirements, thesisType, abroad, notes, expirationDate, level, isArchieved) VALUES (10, 'Design and Implementation of a Recommender System for E-Commerce', 'p456987', '["e-commerce","machine learning"]', 'This thesis proposal aims to design and implement a recommender system for an e-commerce platform. The system will utilize machine learning techniques to recommend products to users based on their past purchases and browsing behavior. The system will be evaluated for its accuracy and effectiveness in increasing sales.', 'The student should have a strong understanding of machine learning algorithms, recommendation systems, and e-commerce technologies. The student should also be proficient in using Python and R programming languages.', 'Research', false, 'This thesis proposal is open to students interested in artificial intelligence, information systems, and machine learning.', '2024-06-30', 'MSc', false);
INSERT INTO thesisProposals (thesisProposalId, title, supervisor, keywords, description, requirements, thesisType, abroad, notes, expirationDate, level, isArchieved) VALUES (11, 'Development of a Secure and Scalable Cloud-Based Infrastructure for Software Development', 'p123654', '["cloud computing","software development","security"]', 'This thesis proposal aims to develop a secure and scalable cloud-based infrastructure to support software development activities. The infrastructure will be designed using cloud computing technologies, such as virtualization, containers, and microservices. The infrastructure will be evaluated for its security, scalability, and performance.', 'The student should have a strong understanding of cloud computing concepts, software architecture, and security principles. The student should also be proficient in using cloud computing platforms, such as AWS or Azure.', 'In Company', false, 'This thesis proposal is open to students interested in software engineering, cloud computing, and security. The student will have the opportunity to work on a real-world problem with a leading cloud computing company.', '2024-05-31', 'MSc', false);
INSERT INTO thesisProposals (thesisProposalId, title, supervisor, keywords, description, requirements, thesisType, abroad, notes, expirationDate, level, isArchieved) VALUES (12, 'Application of Machine Learning for Natural Language Processing in Customer Service Chatbots', 'p456987', '["natural language processing"]', 'This thesis proposal aims to apply machine learning techniques to improve the natural language processing capabilities of customer service chatbots. The research will focus on developing models that can better understand customer intent, respond to complex questions, and provide personalized customer service. The models will be evaluated for their effectiveness in improving customer satisfaction and reducing customer service costs.', 'The student should have a strong understanding of natural language processing, machine learning algorithms, and customer service chatbots. The student should also be proficient in using Python and TensorFlow programming languages.', 'Research', true, 'This thesis proposal is open to students interested in artificial intelligence, human-computer interaction, and natural language processing. The student will have the opportunity to conduct research in a world-renowned laboratory abroad.', '2024-06-15', 'MSc', false);
INSERT INTO thesisProposals (thesisProposalId, title, supervisor, keywords, description, requirements, thesisType, abroad, notes, expirationDate, level, isArchieved) VALUES (13, 'Investigation of the Impact of Corporate Social Responsibility on Financial Performance', 'p321654', '["financial performance"]', 'This thesis proposal aims to investigate the impact of corporate social responsibility (CSR) on financial performance. The research will analyze the relationship between CSR activities and financial metrics, such as profitability, stock returns, and market value. The research will also consider the potential moderating effects of factors such as industry, size, and location.', 'The student should have a strong understanding of CSR principles, financial analysis, and research methodology. The student should also be proficient in using statistical software packages, such as SPSS or Stata.', 'Research', false, 'This thesis proposal is open to students interested in business ethics, strategic management, and sustainability.', '2024-06-30', 'MSc', false);
INSERT INTO thesisProposals (thesisProposalId, title, supervisor, keywords, description, requirements, thesisType, abroad, notes, expirationDate, level, isArchieved) VALUES (14, 'Development of an FPGA-Based Real-Time Image Processing System for Autonomous Vehicles', 'p789012', '["fpga","autonomous vehicles","image processing"]', 'This thesis proposal aims to develop an FPGA-based real-time image processing system for autonomous vehicles. The system will utilize FPGA hardware to accelerate image processing algorithms, such as lane detection and object recognition. The system will be integrated into an autonomous vehicle platform and evaluated for its performance in real-world driving conditions.', 'The student should have a strong understanding of FPGA programming, digital signal processing, and computer vision algorithms. The student should also be proficient in using FPGA development tools, such as Xilinx Vivado or Intel Quartus Prime, and programming languages, such as Verilog or VHDL.', 'In Company', false, 'This thesis proposal is open to students interested in FPGA programming, digital signal processing, and autonomous vehicles. The student will have the opportunity to work on a real-world problem with a leading automotive company.', '2024-05-31', 'MSc', false);
INSERT INTO thesisProposals (thesisProposalId, title, supervisor, keywords, description, requirements, thesisType, abroad, notes, expirationDate, level, isArchieved) VALUES (15, 'Real-Time Operating Systems for Embedded Systems', 'p695310', '["embedded systems","scheduling","resource management"]', 'This thesis proposal aims to explore the design and implementation of real-time operating systems (RTOS) for embedded systems. The focus will be on the development of efficient and scalable scheduling algorithms, resource management techniques, and communication protocols for resource-constrained embedded systems. The proposed research will also investigate the application of RTOS in various real-time applications, such as industrial automation, automotive systems, and medical devices.', 'The candidate should have a strong background in computer science and programming, with a particular interest in embedded systems and real-time systems. The candidate should also be familiar with operating system concepts and have experience with C and C++ programming.', 'Research', false, '', '2023-12-31', 'MSc', false);
INSERT INTO thesisProposals (thesisProposalId, title, supervisor, keywords, description, requirements, thesisType, abroad, notes, expirationDate, level, isArchieved) VALUES (16, 'Development of a DevOps Pipeline for Continuous Integration and Continuous Delivery of Software Applications', 'p271846', '["devops","continuous integration","continuous delivery"]', 'This thesis proposal aims to develop a DevOps pipeline for continuous integration and continuous delivery of software applications. The pipeline will automate the process of building, testing, and deploying software applications. The pipeline will be designed to be scalable and efficient, and it will integrate with a variety of tools and technologies. The pipeline will be evaluated for its ability to reduce development time and improve software quality.', 'The student should have a strong understanding of DevOps principles, continuous integration and continuous delivery practices, and automation tools. The student should also be proficient in using scripting languages, such as Bash or Python, and DevOps tools, such as Jenkins or GitLab CI/CD.', 'In Company', false, 'This thesis proposal is open to students interested in software engineering, DevOps, and automation.', '2024-05-31', 'MSc', false);
INSERT INTO thesisProposals (thesisProposalId, title, supervisor, keywords, description, requirements, thesisType, abroad, notes, expirationDate, level, isArchieved) VALUES (17, 'Software Defined Networking (SDN) for Network Management and Optimization', 'p271846', '["networking","network management","optimization"]', 'This thesis proposal investigates the application of Software Defined Networking (SDN) technologies for improving network management and optimization. The proposed research will focus on developing SDN-based solutions for centralized network control, traffic engineering, and network programmability. The research will also explore the integration of SDN with other network management tools and techniques to enhance network performance and security.', 'The candidate should have a strong background in computer science and network engineering, with a particular interest in SDN and network management. The candidate should also be familiar with network programming languages like OpenFlow or Pyretos, as well as network management protocols like SNMP or Netconf.', 'In Company', false, '', '2024-03-31', 'MSc', false);
INSERT INTO thesisProposals (thesisProposalId, title, supervisor, keywords, description, requirements, thesisType, abroad, notes, expirationDate, level, isArchieved) VALUES (18, 'A Novel Approach to Quantum Cryptography', 'p540287', '["quantum","cryptography","security","information theory"]', 'This thesis proposal aims to explore the feasibility and security of a novel quantum cryptographic protocol based on entanglement swapping and quantum key distribution. The protocol will be implemented and tested on a simulated quantum network using the IBM Qiskit framework.', 'The candidate should have a solid background in quantum mechanics, linear algebra, and cryptography. Experience with Python and Qiskit is desirable.', 'Experimental', true, 'This thesis proposal is part of a larger research project funded by the National Science Foundation.', '2023-12-31', 'MSc', false);
INSERT INTO thesisProposals (thesisProposalId, title, supervisor, keywords, description, requirements, thesisType, abroad, notes, expirationDate, level, isArchieved) VALUES (19, 'Deep Learning for Natural Language Processing', 'p456987', '["deep learning","natural language processing","neural networks","machine learning"]', 'This thesis proposal aims to study the theoretical foundations and limitations of deep learning models for natural language processing tasks, such as sentiment analysis, machine translation, and text summarization. The proposal will also review the state-of-the-art techniques and applications of deep learning for natural language processing.', 'The candidate should have a strong background in mathematics, statistics, and computer science. Experience with TensorFlow, PyTorch, or other deep learning frameworks is required.', 'Theoretical', false, '', '2024-01-31', 'MSc', false);
INSERT INTO thesisProposals (thesisProposalId, title, supervisor, keywords, description, requirements, thesisType, abroad, notes, expirationDate, level, isArchieved) VALUES (20, 'Computational Complexity of Graph Algorithms', 'p321654', '["computational complexity","graph algorithms","np-completeness","approximation algorithms"]', 'This thesis proposal aims to investigate the computational complexity of some fundamental graph problems, such as shortest path, maximum flow, minimum cut, and graph coloring. The proposal will also explore the existence and quality of approximation algorithms for NP-complete graph problems.', 'The candidate should have a deep understanding of computational complexity theory, graph theory, and algorithm design. Experience with LaTeX and mathematical software is desirable.', 'Theoretical', true, '', '2024-03-31', 'MSc', false);
INSERT INTO thesisProposals (thesisProposalId, title, supervisor, keywords, description, requirements, thesisType, abroad, notes, expirationDate, level, isArchieved) VALUES (21, 'Bioinformatics and Computational Biology', 'p540287', '["bioinformatics","computational biology","genomics","proteomics"]', 'This thesis proposal aims to apply and develop bioinformatics and computational biology methods to analyze large-scale biological data, such as genomic sequences, protein structures, and gene expression profiles. The proposal will also explore the biological implications and applications of the results, such as disease diagnosis, drug discovery, and personalized medicine.', 'The candidate should have a strong background in biology, mathematics, and computer science. Experience with R, Python, and bioinformatics tools is required.', 'Experimental', true, 'This thesis proposal is in collaboration with the University of Cambridge, UK. The candidate will spend six months at the partner institution.', '2024-06-30', 'MSc', false);

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* THESIS PROPOSALS EXTERNAL CO-SUPERVISOR BRIDGE */
DELETE FROM thesisProposal_externalCoSupervisor_bridge;
INSERT INTO thesisProposal_externalCoSupervisor_bridge (thesisProposalId, externalCoSupervisorId) VALUES (2, 'e456789');
INSERT INTO thesisProposal_externalCoSupervisor_bridge (thesisProposalId, externalCoSupervisorId) VALUES (5, 'e678901');
INSERT INTO thesisProposal_externalCoSupervisor_bridge (thesisProposalId, externalCoSupervisorId) VALUES (6, 'e678901');
INSERT INTO thesisProposal_externalCoSupervisor_bridge (thesisProposalId, externalCoSupervisorId) VALUES (8, 'e890123');
INSERT INTO thesisProposal_externalCoSupervisor_bridge (thesisProposalId, externalCoSupervisorId) VALUES (11, 'e987654');
INSERT INTO thesisProposal_externalCoSupervisor_bridge (thesisProposalId, externalCoSupervisorId) VALUES (16, 'e987654');
INSERT INTO thesisProposal_externalCoSupervisor_bridge (thesisProposalId, externalCoSupervisorId) VALUES (13, 'e654321');
INSERT INTO thesisProposal_externalCoSupervisor_bridge (thesisProposalId, externalCoSupervisorId) VALUES (19, 'e654321');

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* THESIS PROPOSALS INTERNAL CO-SUPERVISOR BRIDGE */
DELETE FROM thesisProposal_internalCoSupervisor_bridge;
INSERT INTO thesisProposal_internalCoSupervisor_bridge (thesisProposalId, internalCoSupervisorId) VALUES (5, 'p123098');
INSERT INTO thesisProposal_internalCoSupervisor_bridge (thesisProposalId, internalCoSupervisorId) VALUES (9, 'p123098');
INSERT INTO thesisProposal_internalCoSupervisor_bridge (thesisProposalId, internalCoSupervisorId) VALUES (11, 'p456987');
INSERT INTO thesisProposal_internalCoSupervisor_bridge (thesisProposalId, internalCoSupervisorId) VALUES (12, 'p987456');
INSERT INTO thesisProposal_internalCoSupervisor_bridge (thesisProposalId, internalCoSupervisorId) VALUES (12, 'p789012');
INSERT INTO thesisProposal_internalCoSupervisor_bridge (thesisProposalId, internalCoSupervisorId) VALUES (15, 'p789012');
INSERT INTO thesisProposal_internalCoSupervisor_bridge (thesisProposalId, internalCoSupervisorId) VALUES (20, 'p987456');
INSERT INTO thesisProposal_internalCoSupervisor_bridge (thesisProposalId, internalCoSupervisorId) VALUES (20, 'p695310');
INSERT INTO thesisProposal_internalCoSupervisor_bridge (thesisProposalId, internalCoSupervisorId) VALUES (21, 'p456789');

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* THESIS PROPOSALS CDS BRIDGE */
DELETE FROM thesisProposal_cds_bridge;
INSERT INTO thesisProposal_cds_bridge (thesisProposalId, cdsId) VALUES (1, 'L-1');
INSERT INTO thesisProposal_cds_bridge (thesisProposalId, cdsId) VALUES (2, 'L-1');
INSERT INTO thesisProposal_cds_bridge (thesisProposalId, cdsId) VALUES (2, 'L-45');
INSERT INTO thesisProposal_cds_bridge (thesisProposalId, cdsId) VALUES (3, 'L-1');
INSERT INTO thesisProposal_cds_bridge (thesisProposalId, cdsId) VALUES (4, 'L-25');
INSERT INTO thesisProposal_cds_bridge (thesisProposalId, cdsId) VALUES (5, 'L-25');
INSERT INTO thesisProposal_cds_bridge (thesisProposalId, cdsId) VALUES (6, 'L-25');
INSERT INTO thesisProposal_cds_bridge (thesisProposalId, cdsId) VALUES (7, 'L-34');
INSERT INTO thesisProposal_cds_bridge (thesisProposalId, cdsId) VALUES (8, 'L-34');
INSERT INTO thesisProposal_cds_bridge (thesisProposalId, cdsId) VALUES (9, 'L-34');
INSERT INTO thesisProposal_cds_bridge (thesisProposalId, cdsId) VALUES (10, 'LM-9');
INSERT INTO thesisProposal_cds_bridge (thesisProposalId, cdsId) VALUES (11, 'LM-9');
INSERT INTO thesisProposal_cds_bridge (thesisProposalId, cdsId) VALUES (12, 'LM-9');
INSERT INTO thesisProposal_cds_bridge (thesisProposalId, cdsId) VALUES (13, 'LM-13');
INSERT INTO thesisProposal_cds_bridge (thesisProposalId, cdsId) VALUES (14, 'LM-10');
INSERT INTO thesisProposal_cds_bridge (thesisProposalId, cdsId) VALUES (15, 'LM-9');
INSERT INTO thesisProposal_cds_bridge (thesisProposalId, cdsId) VALUES (15, 'LM-10');
INSERT INTO thesisProposal_cds_bridge (thesisProposalId, cdsId) VALUES (16, 'LM-9');
INSERT INTO thesisProposal_cds_bridge (thesisProposalId, cdsId) VALUES (17, 'LM-9');
INSERT INTO thesisProposal_cds_bridge (thesisProposalId, cdsId) VALUES (18, 'LM-9');
INSERT INTO thesisProposal_cds_bridge (thesisProposalId, cdsId) VALUES (19, 'LM-9');
INSERT INTO thesisProposal_cds_bridge (thesisProposalId, cdsId) VALUES (20, 'LM-9');
INSERT INTO thesisProposal_cds_bridge (thesisProposalId, cdsId) VALUES (21, 'LM-9');

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

/* THESIS PROPOSALS CDS BRIDGE */
DELETE FROM applications;
INSERT INTO applications (thesisProposalId, studentId, date, status) VALUES (11, 's654321', '2023-11-15', 'Pending');
INSERT INTO applications (thesisProposalId, studentId, date, status) VALUES (11, 's876543', '2023-09-09', 'Pending');
INSERT INTO applications (thesisProposalId, studentId, date, status) VALUES (11, 's345678', '2023-05-22', 'Pending');
INSERT INTO applications (thesisProposalId, studentId, date, status) VALUES (12, 's654321', '2023-10-30', 'Pending');
INSERT INTO applications (thesisProposalId, studentId, date, status) VALUES (13, 's654321', '2023-08-15', 'Pending');

/* STUDENT CAREERS */
DELETE FROM careers;
INSERT INTO careers (studentId, codCourse, titleCourse, cfu, grade, date) VALUES ('s654321', '13PROGWEB', 'Programming for the Web', 9, 29, '2022-10-04');
INSERT INTO careers (studentId, codCourse, titleCourse, cfu, grade, date) VALUES ('s654321', '14ALGORIT', 'Algorithms and Data Structures', 12, 30, '2022-11-24');
INSERT INTO careers (studentId, codCourse, titleCourse, cfu, grade, date) VALUES ('s654321', '15SO', 'Operating Systems', 9, 28, '2022-12-01');
INSERT INTO careers (studentId, codCourse, titleCourse, cfu, grade, date) VALUES ('s654321', '16BDATI', 'Databases', 9, 27, '2022-10-11');
INSERT INTO careers (studentId, codCourse, titleCourse, cfu, grade, date) VALUES ('s654321', '17RETI', 'Computer Networks', 9, 29, '2022-11-07');
INSERT INTO careers (studentId, codCourse, titleCourse, cfu, grade, date) VALUES ('s654321', '18SICUREZ', 'Computer Security', 9, 26, '2022-11-21');
INSERT INTO careers (studentId, codCourse, titleCourse, cfu, grade, date) VALUES ('s654321', '19INTELART', 'Artificial Intelligence', 6, 30, '2022-10-18');
INSERT INTO careers (studentId, codCourse, titleCourse, cfu, grade, date) VALUES ('s654321', '20COMPGRAF', 'Computer Graphics', 6, 28, '2022-11-14');
INSERT INTO careers (studentId, codCourse, titleCourse, cfu, grade, date) VALUES ('s654321', '21HPC', 'High Performance Computing', 6, 29, '2022-12-15');
INSERT INTO careers (studentId, codCourse, titleCourse, cfu, grade, date) VALUES ('s876543', '13PROGWEB', 'Programming for the Web', 9, 20, '2022-10-04');
INSERT INTO careers (studentId, codCourse, titleCourse, cfu, grade, date) VALUES ('s876543', '14ALGORIT', 'Algorithms and Data Structures', 12, 18, '2022-11-24');
INSERT INTO careers (studentId, codCourse, titleCourse, cfu, grade, date) VALUES ('s876543', '15SO', 'Operating Systems', 9, 24, '2022-12-01');

/* THESIS REQUEST */
DELETE FROM thesisRequests;
INSERT INTO thesisRequests (thesisProposalId, studentId, title, supervisor, description, secretaryStatus, professorStatus, date) VALUES (NULL, 's654321', 'Enhancing Edge Computing for Real-time Medical Image Processing with Efficient Data Compression and Processing Techniques', 'p123654', 'Development of novel data compression techniques tailored for medical images to reduce bandwidth requirements and enable real-time access. Exploration of hardware-accelerated processing techniques to optimize computational efficiency for handling complex medical image processing tasks with reduced latency. Design and evaluation of comprehensive edge computing architectures for real-time medical image processing, showcasing significant performance improvements.', 'Accepted', 'Pendinng', '2024-11-01');

/* THESIS PROPOSALS EXTERNAL CO-SUPERVISOR BRIDGE */
DELETE FROM thesisRequest_internalCoSupervisor_bridge;
INSERT INTO thesisRequest_internalCoSupervisor_bridge (thesisRequestId, internalCoSupervisorId) VALUES (1, 'p271846');