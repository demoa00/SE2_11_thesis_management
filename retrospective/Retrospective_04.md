TEMPLATE FOR RETROSPECTIVE (Team 11)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs done : 12 / 12
- Total points committed vs done : 47 / 47
- Nr of hours planned vs spent (as a team) : 93h / 88h

**Remember**  a story is done ONLY if it fits the Definition of Done:
 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD 

### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _#0_   | 5       | -      | 18h        | 20h 30m      |
| 18     | 3       | 2      | 2h 30m     | 2h 15m       |
| 20     | 3       | 1      | 2h 30m     | 2h 15m       |
| 26     | 7       | 8      | 14h 30m    | 19h 15m      |
| 27     | 7       | 13     | 14h 30m    | 7h 30m       |
| 28     | 6       | 8      | 8h 30m     | 8h 45m       |
| 29     | 3       | 1      | 2h 30m     | 1h 45m       |
| 30     | 3       | 2      | 4h 30m     | 2h 45m       |
| 31     | 5       | 5      | 9h 30m     | 8h 45m       |
| 32     | 3       | 1      | 2h 30m     | 2h 15m       |
| 33     | 5       | 3      | 7h 30m     | 6h 45m       |
| 34     | 3       | 1      | 2h 30m     | 2h 15m       |
| 36     | 4       | 2      | 3h 30m     | 3h           |

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task (average, standard deviation) : 1.87 h/t; (e,a): (5.275, 6.139)
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent -1 : (93 - 88) - 1 = 0.0568

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated : 19h
  - Total hours spent : 15h
  - Nr of automated unit test cases : 391
  - Coverage (if available) : 86%
- E2E testing:
  - Total hours estimated : 3h
  - Total hours spent : 5h 30m
- Code review 
  - Total hours estimated : 6h
  - Total hours spent : 6h
- Technical Debt management:
  - Total hours estimated : 6h
  - Total hours spent : 6h
  - Hours estimated for remediation by SonarQube : 24h
  - Hours estimated for remediation by SonarQube only for the selected and planned issues : 6h
  - Hours spent on remediation : 6h
  - debt ratio (as reported by SonarQube under "Measures-Maintainability") : 0.3%
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability ) : C, A, A
  


## ASSESSMENT

- What caused your errors in estimation (if any)?
  For the frontend part, we over-estimated the introduction of a new role (specifically the one about Secretary Clerk) and the adding of graphical elements.
  For the backend one, we spent less time than estimated since most of the structure was already implemented. 
  On the other hand we under-estimated the effort for doing the testing.
  
- What lessons did you learn (both positive and negative) in this sprint?
  We learned about how Docker works in detail. On the other hand we found out that it's hard to split work properly in order to avoid to wait too much for other's work to be completed.

- Which improvement goals set in the previous retrospective were you able to achieve?
  None
  
- Which ones you were not able to achieve? Why?
  Because we didn't coordinate well the work, so one had to wait much time for another's work in order to prosecute, and we weren't able to finish all the coding some days before the deadline.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
> Propose one or two
Try to coordinate better the workflows of each member.

- One thing you are proud of as a Team!!
  We managed to finish a lot of stories and create a solid application
