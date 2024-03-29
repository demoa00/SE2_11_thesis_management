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
import {NotificationComponent} from './shared/components/notification/notification/notification.component';
import {ButtonComponent} from './shared/components/button/button.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {PageSkeletonComponent} from './shared/components/page-skeleton/page-skeleton.component';
import {AlertComponent} from './shared/alert/alert.component';
import {LoadingComponent} from "./shared/components/loading/loading.component";
import {CreateThesisFormComponent} from './pages/professor-page/thesis-management/create-thesis-form/create-thesis-form.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthModule} from "@auth0/auth0-angular";
import {AuthGuardProfessorService} from "./shared/services/auth-guard-professor.service";
import {ActiveThesisTableComponent} from './pages/professor-page/thesis-management/active-thesis-table/active-thesis-table.component';
import {AuthGuardStudentService} from "./shared/services/auth-guard-student.service";
import {MatIconModule} from "@angular/material/icon";
import {FiltersContainerComponent} from './pages/student-page/components/filters-container/filters-container.component';
import {DropdownCheckboxComponent} from './pages/student-page/components/dropdown-checkbox/dropdown-checkbox.component';
import {CheckboxComponent} from './pages/student-page/components/dropdown-checkbox/checkbox/checkbox.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatNativeDateModule} from "@angular/material/core";
import {ThesisDetailsComponent} from './pages/professor-page/thesis-management/thesis-details/thesis-details.component';
import {ApplicationsViewComponent} from './pages/student-page/components/applications/applications-view/applications-view.component';
import {NotificationsContainerComponent} from './shared/components/notification/container/notifications-container/notifications-container.component';
import {SocketIoModule} from "ngx-socket-io";
import {ArchivedThesisTableComponent} from "./pages/professor-page/thesis-management/archived-thesis-table/archived-thesis-table.component";
import {ProfilePageComponent} from "./shared/profile-page/profile-page.component";
import {UpdateThesisFormComponent} from "./pages/professor-page/thesis-management/update-thesis-form/update-thesis-form.component";
import {ApllicantDetailsComponent} from "./pages/professor-page/thesis-management/apllicant-details/apllicant-details.component";
import {RequestsViewComponent} from "./pages/student-page/components/requests/requests-view/requests-view.component";
import {ThesisRequestsTableComponent} from "./pages/professor-page/thesis-management/thesis-requests-table/thesis-requests-table.component";
import {ThesisRequestDetailsComponent} from "./pages/professor-page/thesis-management/thesis-request-details/thesis-request-details.component";
import {RequestFormComponent} from "./pages/student-page/components/requests/components/request-form/request-form.component";
import {ProposalsViewComponent} from "./pages/student-page/components/proposals/proposals-view/proposals-view.component";
import {ProposalDetailsComponent} from "./pages/student-page/components/proposals/proposal-details/proposal-details.component";
import {AuthGuardSecretaryService} from "./shared/services/auth-guard-secretary.service";
import {SecretaryPageComponent} from "./pages/secretary-page/secretary-page.component";
import {
  ApplicationDetailsComponent
} from "./pages/student-page/components/applications/application-details/application-details.component";
import {
  RequestDetailsComponent
} from "./pages/student-page/components/requests/request-details/request-details.component";
import {
  SecretaryRequestDetailsComponent
} from "./pages/secretary-page/components/requests/secretary-request-details/secretary-request-details.component";
import {
  SecretaryRequestsViewComponent
} from "./pages/secretary-page/components/requests/secretary-requests-view/secretary-requests-view.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'student', canActivate : [AuthGuardStudentService],component: StudentPageComponent},
  {path: 'professor', canActivate : [AuthGuardProfessorService],  component: ProfessorPageComponent},
  {path: 'secretary', canActivate : [AuthGuardSecretaryService],  component: SecretaryPageComponent},
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
    ArchivedThesisTableComponent,
    FiltersContainerComponent,
    DropdownCheckboxComponent,
    CheckboxComponent,
    ThesisDetailsComponent,
    ApplicationsViewComponent,
    NotificationsContainerComponent,
    UpdateThesisFormComponent,
    ProfilePageComponent,
    ApllicantDetailsComponent,
		RequestsViewComponent,
    ThesisRequestsTableComponent,
    ThesisRequestDetailsComponent,
    RequestFormComponent,
    ProposalsViewComponent,
    ProposalDetailsComponent,
    SecretaryPageComponent,
    ApplicationDetailsComponent,
    RequestDetailsComponent,
    SecretaryRequestDetailsComponent,
    SecretaryRequestsViewComponent
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
		SocketIoModule.forRoot({url: 'http://localhost:3000', options: {withCredentials: true, autoConnect: true}}),
	],
  providers: [AuthGuardProfessorService],
  exports: [
    ButtonComponent,
    ProposalDetailsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
