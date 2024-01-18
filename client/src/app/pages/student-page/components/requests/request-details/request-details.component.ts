import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrl: './request-details.component.scss'
})
export class RequestDetailsComponent {
  @Input() selectedRequest!: any;
  @Output() selectedRequestUpdate = new EventEmitter<unknown>();

}
