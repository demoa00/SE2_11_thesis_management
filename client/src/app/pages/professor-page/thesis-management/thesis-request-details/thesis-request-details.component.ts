import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-thesis-request-details',
  templateUrl: './thesis-request-details.component.html',
  styleUrl: './thesis-request-details.component.scss'
})
export class ThesisRequestDetailsComponent {
  @Input()
  selectedRequest:any;
}
