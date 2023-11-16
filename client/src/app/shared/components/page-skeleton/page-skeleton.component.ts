import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-skeleton',
  templateUrl: './page-skeleton.component.html',
  styleUrls: ['./page-skeleton.component.scss']
})
export class PageSkeletonComponent {

  constructor(private _router: Router) {}

  currentRoute = this._router.url;

  logout() {
    this._router.navigate(['/']);
  }
}