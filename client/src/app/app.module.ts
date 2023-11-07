import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from "@angular/router";
import { StudentPageComponent } from './pages/student-page/student-page.component';

const routes: Routes = [{path: 'student', component: StudentPageComponent}]

@NgModule({
  declarations: [
    AppComponent,
    StudentPageComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
