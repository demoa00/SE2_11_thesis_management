import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ApplicationViewComponent } from './application-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APIService } from 'src/app/shared/services/api.service';

describe('ApplicationViewComponent', () => {
  let component: ApplicationViewComponent;
  let fixture: ComponentFixture<ApplicationViewComponent>;
  let apiService: jasmine.SpyObj<APIService>;

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('APIService', {
      'getApplications': Promise.resolve([]),
      'getApplicationById': Promise.resolve([])
    });

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ApplicationViewComponent],
      providers: [{ provide: APIService, useValue: apiService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationViewComponent);
    component = fixture.componentInstance;
    
    await fixture.whenStable();
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit and fetch applications', fakeAsync(() => {
    spyOn(component, 'ngOnInit').and.callThrough();

    component.ngOnInit();

    fixture.detectChanges();
    tick();

    expect(component.ngOnInit).toHaveBeenCalled();
    expect(apiService.getApplications).toHaveBeenCalled();
    expect(component.applications).toBeDefined();
  }));

  it('should select application and fetch details', fakeAsync(() => {
    const mockApplication = {};
    spyOn(component, 'selectApplication').and.callThrough();  

    component.applications = [mockApplication];

    component.selectApplication(mockApplication);
    tick();

    expect(component.selectApplication).toHaveBeenCalledWith(mockApplication);
    expect(apiService.getApplicationById).toHaveBeenCalledWith(mockApplication, component.user.userId);
    expect(component.selectedApplication).toBeDefined();
  }));
});
