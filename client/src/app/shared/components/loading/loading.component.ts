import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input()
  color: string = 'blue';
  @Input()
  size: number = 6;
  @Input()
  transparent: boolean = false;
}
