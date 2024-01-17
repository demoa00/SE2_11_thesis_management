import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SecretaryPageComponent } from './secretary-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PageSkeletonComponent } from 'src/app/shared/components/page-skeleton/page-skeleton.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { APIService } from 'src/app/shared/services/api.service';

describe('SecretaryPageComponent', () => {
  let component: SecretaryPageComponent;
  let fixture: ComponentFixture<SecretaryPageComponent>;
  let apiService: jasmine.SpyObj<APIService>;

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('APIService', {
      'getThesisRequests': Promise.resolve([]),
      'checkAutorization': Promise.resolve([]),
      'getSecretaryClerkDetails': Promise.resolve([]),
    });

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatIconModule, MatDatepickerModule, MatNativeDateModule],
      declarations: [SecretaryPageComponent, PageSkeletonComponent],
      providers: [{ provide: APIService, useValue: apiService }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecretaryPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch thesis requests on ngOnInit', fakeAsync(() => {
    const mockResponse = [{ coSupervised: false }];
    apiService.getThesisRequests.and.returnValue(Promise.resolve(mockResponse));

    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(apiService.getThesisRequests).toHaveBeenCalled();
    expect(component.requests).toEqual(mockResponse);
  }));

  it('should handle error on ngOnInit', () => {
    const mockError = 'Test Error';

    apiService.getThesisRequests.and.returnValue(Promise.reject(mockError));

    let res = component.ngOnInit();

    expect(res).toBeUndefined();
  });

  it('should select the menu item with the specified id', () => {
    const menuItemId = 0;
  
    component.selectMenuItem(menuItemId);
  
    expect(component.menuItems[menuItemId].selected).toBeTruthy();
  });
});
