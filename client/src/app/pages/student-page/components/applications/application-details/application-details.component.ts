import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrl: './application-details.component.scss'
})
export class ApplicationDetailsComponent {
  @Input() selectedApplication!: any;
  @Output() selectedApplicationUpdate = new EventEmitter<any>();

}
