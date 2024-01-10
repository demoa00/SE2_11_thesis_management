import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {AppModule} from "../../../../app.module";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})
export class RequestsComponent {
  requests = []
}
