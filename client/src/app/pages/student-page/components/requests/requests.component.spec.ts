import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsComponent } from './requests.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { PopupComponent } from 'src/app/shared/components/popup-conferma/popup.component';
import { RequestFormComponent } from './components/request-form/request-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { FormsModule } from '@angular/forms';
import { APIService } from 'src/app/shared/services/api.service';

describe('RequestsComponent', () => {
  let component: RequestsComponent;
  let fixture: ComponentFixture<RequestsComponent>;
  let apiService: jasmine.SpyObj<APIService>;

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('APIService', {
      'getThesisRequests': Promise.resolve([]),
    })

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [RequestsComponent, ButtonComponent, PopupComponent, RequestFormComponent, IconComponent],
      providers: [{ provide: APIService, useValue: apiService }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch thesis requests on ngOnInit', async () => {
    const responseData = [{ coSupervised: false }];
    apiService.getThesisRequests.and.returnValue(Promise.resolve(responseData));

    await component.ngOnInit();

    expect(apiService.getThesisRequests).toHaveBeenCalled();
    expect(component.requests).toEqual(responseData);
  });

  it('should handle error on ngOnInit', async () => {
    const mockError = 'Test Error';

    apiService.getThesisRequests.and.returnValue(Promise.reject(mockError));

    let result = await component.ngOnInit();

    expect(result).toBeUndefined();
  });
});
