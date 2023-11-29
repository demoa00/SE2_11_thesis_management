import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-thesis-details',
  templateUrl: './thesis-details.component.html',
  styleUrls: ['./thesis-details.component.scss']
})
export class ThesisDetailsComponent {
  @Input()
  selectedProposal:any;

}
