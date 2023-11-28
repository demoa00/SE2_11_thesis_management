import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  constructor() { }
  darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

}
