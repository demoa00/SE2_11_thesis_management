import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-secretary-request-details',
  templateUrl: './secretary-request-details.component.html',
  styleUrl: './secretary-request-details.component.scss'
})
export class SecretaryRequestDetailsComponent {
  @Input() selectedRequest: any;
  @Output() selectedRequestUpdate = new EventEmitter<unknown>();

}
