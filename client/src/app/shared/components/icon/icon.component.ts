import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { OrIcon, orIcons } from './icons';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  icons = orIcons;

  @Input() name!: OrIcon;

  @HostBinding('class') @Input('class') classList = '';

  ngOnInit() {
  if (!this.classList.includes('icon-') && !this.classList.includes('w-') && !this.classList.includes('h-')) {
      this.classList += ' w-4 h-4';
    }
  }
}
