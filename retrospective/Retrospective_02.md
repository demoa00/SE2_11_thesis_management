RETROSPECTIVE 2 (Team 11)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs. done: 7 / 7 
- Total points committed vs. done: 28 / 28
- Nr of hours planned vs. spent (as a team): 96 h / 98 h

**Remember**a story is done ONLY if it fits the Definition of Done:
 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD if required (you cannot remove items!) 

### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _#0_   |    13     |       |     70       |     76.5         |
| #5      |     4    |   2     |    9        |     10         |
| #6      |     4    |    3    |    10        |     7         |
| #7      |     1    |    3    |     5       |       2.5       |

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual) : 96h/22tasks = 4.36 h/t; standard deviation (e, a): (26,912, 30,428)
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1 => 98/96 -1 = 0.020

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated : 24 h
  - Total hours spent : 24 h 45 m
  - Nr of automated unit test cases : 88 
  - Coverage (if available) : 50 %
- E2E testing:
  - Total hours estimated : 0
  - Total hours spent : 0
- Code review 
  - Total hours estimated : 0 
  - Total hours spent : 0
  


## ASSESSMENT

- What caused your errors in estimation (if any)?
> SAML login implementation (CORS), changes to the routes of the backend, link forntend with backend
- What lessons did you learn (both positive and negative) in this sprint?
> How Docker and  SAML work, how much is difficult to link components from different sources 
- Which improvement goals set in the previous retrospective were you able to achieve?
> We managed to accomplish our stories in a more complete way
- Which ones you were not able to achieve? Why?
> We have achieved all the goals we expected to achieve from the previous sprint
- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
>Complete Docker implementation,
Refine mobile layout,
Tasks to fix the tests.
>Establish a deadline two or three days before the Demo, so we have enough time to test and ensure that everything works properly.

- One thing you are proud of as a Team!!
When we work as a team we amnage to overcome the troubles
