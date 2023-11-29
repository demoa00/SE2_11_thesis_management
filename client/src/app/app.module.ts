import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {StudentPageComponent} from './pages/student-page/student-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProfessorPageComponent} from "./pages/professor-page/professor-page.component";
import {ThesisManagementComponent} from "./pages/professor-page/thesis-management/thesis-management.component";
import {ApplicantsTableComponent} from './pages/professor-page/thesis-management/applicants-table/applicants-table.component';
import {PopupComponent} from "./shared/components/popup-conferma/popup.component";
import {ButtonSliderComponent} from "./shared/components/button-slider/button-slider.component";
import {IconComponent} from "./shared/components/icon/icon.component";
import {CdkDrag} from "@angular/cdk/drag-drop";
import {NotificationComponent} from './shared/components/notification/notification.component';
import {ButtonComponent} from './shared/components/button/button.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {PageSkeletonComponent} from './shared/components/page-skeleton/page-skeleton.component';
import {AlertComponent} from './shared/alert/alert.component';
import {LoadingComponent} from "./shared/components/loading/loading.component";
import {
  CreateThesisFormComponent
} from './pages/professor-page/thesis-management/create-thesis-form/create-thesis-form.component';
import {HttpClientModule} from '@angular/common/http';

import {AuthModule} from "@auth0/auth0-angular";
import { AuthGuardProfessorService } from "./shared/services/auth-guard-professor.service";
import { ActiveThesisTableComponent } from './pages/professor-page/thesis-management/active-thesis-table/active-thesis-table.component';
import {AuthGuardStudentService} from "./shared/services/auth-guard-student.service";
import {MatIconModule} from "@angular/material/icon";
import { FiltersContainerComponent } from './pages/student-page/components/filters-container/filters-container.component';
import { DropdownCheckboxComponent } from './pages/student-page/components/dropdown-checkbox/dropdown-checkbox.component';
import { CheckboxComponent } from './pages/student-page/components/dropdown-checkbox/checkbox/checkbox.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatNativeDateModule} from "@angular/material/core";
import { ThesisDetailsComponent } from './pages/professor-page/thesis-management/thesis-details/thesis-details.component';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'student', canActivate : [AuthGuardStudentService],component: StudentPageComponent},
  {path: 'professor', canActivate : [AuthGuardProfessorService],  component: ProfessorPageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    StudentPageComponent,
    ProfessorPageComponent,
    ThesisManagementComponent,
    ApplicantsTableComponent,
    PopupComponent,
    ButtonSliderComponent,
    IconComponent,
    NotificationComponent,
    ButtonComponent,
    HomePageComponent,
    PageSkeletonComponent,
    AlertComponent,
    LoadingComponent,
    CreateThesisFormComponent,
    ActiveThesisTableComponent,
    FiltersContainerComponent,
    DropdownCheckboxComponent,
    CheckboxComponent,
    ThesisDetailsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    CdkDrag,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-qzcvobvfrndn6b3g.us.auth0.com',
      clientId: 'OmyzHGjNrO1FRlu3umd3xv1ZMMHyEYq6',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthGuardProfessorService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
