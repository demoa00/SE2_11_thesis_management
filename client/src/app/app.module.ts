import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from "@angular/router";
import { StudentPageComponent } from './pages/student-page/student-page.component';
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {path: 'student', component: StudentPageComponent},
  {path: '', redirectTo: '/student', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    StudentPageComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes), FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
