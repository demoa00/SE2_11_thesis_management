TEMPLATE FOR RETROSPECTIVE (Team 11)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs done : 17 / 17
- Total points committed vs done : 59 / 59
- Nr of hours planned vs spent (as a team) : 102h 30m / 94h

**Remember**  a story is done ONLY if it fits the Definition of Done:
 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD 

### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _#0_   | 19      |    -   | 55h        | 52h          |
| 8      | 2       | 3      | 8h         | 9h           |
| 9      | 2       | 8      | 1h 30m     | 1h 30m       |
| 10     | 2       | 1      | 1h 30m     | 1h 45m       |
| 11     | 2       | 2      | 3h         | 1h           | 
| 12     | 2       | 8      | 1h 30m     | 1h           | 
| 13     | 2       | 8      | 10h        | 11h          | 
| 14     | 0       | 3      | 0h         | 0h           |
| 15     | 2       | 8      | 2h         | 1h 30m       |
| 16     | 2       | 1      | 1h         | 1h           | 
| 19     | 0       | 2      | 0h         | 0h           |
| 21     | 0       | 1      | 0h         | 0h           |
| 22     | 2       | 1      | 2h 30m     | 2h           |
| 23     | 0       | 1      | 0h         | 0h           |
| 24     | 0       | 1      | 0h         | 0h           | 
| 25     | 0       | 1      | 0h         | 0h           | 
| 26     | 2       | 5      | 24h        | 18h          |
| 35     | 0       | 3      | 0h         | 0h           |

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task (average, standard deviation) : 2,41h; (e,a): (15,89; 14,72)
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent -1 : 0.09

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated : 20h
  - Total hours spent : 16.5h
  - Nr of automated unit test cases : 192
  - Coverage (if available) : 60%
- E2E testing:
  - Total hours estimated : 2h
  - Total hours spent : 1h 30m
- Code review 
  - Total hours estimated : 6h
  - Total hours spent : 6h 30m
- Technical Debt management:
  - Total hours estimated : 5h
  - Total hours spent : 3h 30m
  - Hours estimated for remediation by SonarQube : 8h
  - Hours estimated for remediation by SonarQube only for the selected and planned issues
  - Hours spent on remediation
  - debt ratio (as reported by SonarQube under "Measures-Maintainability")
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability )
  


## ASSESSMENT

- What caused your errors in estimation (if any)?
  Some tasks were easier than expected, while others were more problematic (i.e. the notification ones, and building the responsive design).

- What lessons did you learn (both positive and negative) in this sprint?
  We learned to better manage our time. On the other hand, we saw that a less precise planning leads to difficulties in developing.

- Which improvement goals set in the previous retrospective were you able to achieve?
  We managed to refine the mobile layout and increase the coverage of the tests.
  
- Which ones you were not able to achieve? Why?
  We weren't able to finish the work a couple of days before the Demo, as we planned to, because maybe we committed to too many stories (even though we managed to finish them).

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
> Propose one or two
For the last sprint we'll try to better estimate the amount of stories in order to finish two or three days before the deadline, to ensure that everything works properly.

- One thing you are proud of as a Team!!
  We created a good project with solid base, and we managed to increase the amount of story points done.
