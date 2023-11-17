import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from "@angular/router";
import { StudentPageComponent } from './pages/student-page/student-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProfessorPageComponent} from "./pages/professor-page/professor-page.component";
import {ThesisManagementComponent} from "./pages/professor-page/thesis-management/thesis-management.component";
import { ThesisTableComponent } from './pages/professor-page/thesis-management/thesis-table/thesis-table.component';
import {PopupComponent} from "./shared/components/popup-conferma/popup.component";
import {ButtonSliderComponent} from "./shared/components/button-slider/button-slider.component";
import {IconComponent} from "./shared/components/icon/icon.component";
import {CdkDrag} from "@angular/cdk/drag-drop";
import { NotificationComponent } from './shared/components/notification/notification.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginFormComponent } from './shared/components/login-form/login-form.component';
import { PageSkeletonComponent } from './shared/components/page-skeleton/page-skeleton.component';
import { AlertComponent } from './shared/alert/alert.component';
import {LoadingComponent} from "./shared/components/loading/loading.component";
import { CreateThesisFormComponent } from './pages/professor-page/thesis-management/create-thesis-form/create-thesis-form.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'student', component: StudentPageComponent},
  {path: 'professor', component: ProfessorPageComponent}
]

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
    ButtonComponent,
    HomePageComponent,
    LoginFormComponent,
    PageSkeletonComponent,
    AlertComponent,
    LoadingComponent,
    CreateThesisFormComponent
  ],
    imports: [
        BrowserModule, RouterModule.forRoot(routes), FormsModule, CdkDrag, ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
