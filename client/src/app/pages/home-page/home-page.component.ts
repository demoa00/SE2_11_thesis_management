import {Component, OnInit} from '@angular/core';
import {APIService} from "../../shared/services/api.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{
  showAlert = false;
  constructor(public api: APIService) {

  }
  ngOnInit() {
    this.api.checkAutorization()
  }
}
