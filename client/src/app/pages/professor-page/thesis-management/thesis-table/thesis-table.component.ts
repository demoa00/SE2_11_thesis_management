import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-thesis-table',
  templateUrl: './thesis-table.component.html',
  styleUrls: ['./thesis-table.component.scss']
})
export class ThesisTableComponent {

  @Input()
  rows:any;

  @Input()
  applicants = false;

  @Input()
  activeTheses = false;

  @Input()
  archivedTheses = false;
}
