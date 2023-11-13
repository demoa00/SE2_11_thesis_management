import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from "@angular/router";
import { StudentPageComponent } from './pages/student-page/student-page.component';
import {FormsModule} from "@angular/forms";
import {ProfessorPageComponent} from "./pages/professor-page/professor-page.component";
import {ThesisManagementComponent} from "./pages/professor-page/thesis-management/thesis-management.component";
import { ThesisTableComponent } from './pages/professor-page/thesis-management/thesis-table/thesis-table.component';
import {PopupComponent} from "./shared/components/popup-conferma/popup.component";
import {ButtonSliderComponent} from "./shared/components/button-slider/button-slider.component";
import {IconComponent} from "./shared/components/icon/icon.component";
import {CdkDrag} from "@angular/cdk/drag-drop";
import { NotificationComponent } from './shared/notification/notification.component';
import { ButtonComponent } from './shared/components/button/button.component';

const routes: Routes = [{path: 'student', component: StudentPageComponent}, {path: 'professor', component: ProfessorPageComponent}]

@NgModule({
  declarations: [
    AppComponent,
    StudentPageComponent,
    ProfessorPageComponent,
    ThesisManagementComponent,
    ThesisTableComponent,
    PopupComponent,
    ButtonSliderComponent,
    IconComponent,
    NotificationComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes), FormsModule, CdkDrag
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
