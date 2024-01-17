import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-dropdown-checkbox',
  templateUrl: './dropdown-checkbox.component.html',
  styleUrls: ['./dropdown-checkbox.component.scss']
})
export class DropdownCheckboxComponent {
  @Input()
  hover: boolean = false;
  @Input()
  showSearch: boolean = true;
  @Input()
  searchValue: string = '';
  @Input()
  updateSearchFunction: Function = () => {};

  @Output()
  searchedValue: EventEmitter<string> = new EventEmitter<string>();
  @Input() request = false;

  updateSearch(value: string) {
    this.updateSearchFunction(value);
    this.searchedValue.emit(value.trim().toLowerCase());
  }

}
