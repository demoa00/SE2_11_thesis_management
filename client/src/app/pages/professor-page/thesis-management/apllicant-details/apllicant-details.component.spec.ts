import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ApllicantDetailsComponent } from './apllicant-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { APIService } from 'src/app/shared/services/api.service';

describe('ApllicantDetailsComponent', () => {
  let component: ApllicantDetailsComponent;
  let fixture: ComponentFixture<ApllicantDetailsComponent>;
  let apiService: jasmine.SpyObj<APIService>;

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('APIService', {
      'getApplicationById': Promise.resolve([]),
      'getUserDetails': Promise.resolve([]),
      'getCareer': Promise.resolve([]),
      'getCv': Promise.resolve(new Blob())
    });

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ApllicantDetailsComponent, IconComponent],
      providers: [{ provide: APIService, useValue: apiService }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApllicantDetailsComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize data on ngOnInit', async () => {
    await component.ngOnInit();
    fixture.detectChanges();
    await fixture.whenStable();
  
    expect(component.application).toBeDefined();
    expect(component.user).toBeDefined();
    expect(component.cv).toBeDefined();
    expect(component.career).toBeDefined();
  });

  it('should download CV when getCv() is called', fakeAsync(() => {
    const spyCreateElement = spyOn(document, 'createElement').and.callThrough();
    const spyBodyAppend = spyOn(document.body, 'appendChild').and.callThrough();
    const spyBodyRemove = spyOn(document.body, 'removeChild').and.callThrough();
    
    component.getCv();
    tick();

    expect(apiService.getCv).toHaveBeenCalledWith(component.userId);
    expect(spyCreateElement).toHaveBeenCalledOnceWith('a');
    expect(spyBodyAppend).toHaveBeenCalledOnceWith(jasmine.any(HTMLAnchorElement));
    expect(spyBodyRemove).toHaveBeenCalledOnceWith(jasmine.any(HTMLAnchorElement));
  }));
});
