import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ProfilePageComponent } from './profile-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ButtonComponent } from '../components/button/button.component';
import { APIService } from '../services/api.service';

describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;
  let apiService: jasmine.SpyObj<APIService>;

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('APIService', {
      'getUserDetails': Promise.resolve([]),
      'getCareer': Promise.resolve([]),
      'postCv': Promise.resolve([]),
      'getCv': Promise.resolve(new Blob()),
      'deleteCv': Promise.resolve([])
    });

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProfilePageComponent, ButtonComponent],
      providers: [{ provide: APIService, useValue: apiService }]
    }).compileComponents();
    
    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load file successfully', fakeAsync(() => {
    const file = new File([''], 'test.pdf', { type: 'application/pdf' });
    const event = { target: { files: [file] } } as any;

    component.loadFile(event);
    tick();

    expect(apiService.postCv).toHaveBeenCalledWith(jasmine.any(FormData));

    expect(component.cv.name).toBe(`${component.userId}.pdf`);
  }));

  it('should call getCv API and download file', fakeAsync(() => {
    const mockBlob = new Blob(['Mock file content'], { type: 'application/pdf' });
    apiService.getCv.and.resolveTo(mockBlob);

    const createObjectURLSpy = spyOn(window.URL, 'createObjectURL').and.callThrough();

    const createElementSpy = spyOn(document, 'createElement').and.callThrough();
    const appendChildSpy = spyOn(document.body, 'appendChild').and.callThrough();

    const removeChildSpy = spyOn(document.body, 'removeChild').and.callThrough();

    component.getCv();
    tick();

    expect(apiService.getCv).toHaveBeenCalledWith(component.userId);

    expect(createObjectURLSpy).toHaveBeenCalledWith(mockBlob);

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(appendChildSpy).toHaveBeenCalled();

    expect(removeChildSpy).toHaveBeenCalled();
  }));

  it('should delete CV', fakeAsync(() => {
    component.deleteCv();
    tick();
    
    expect(apiService.deleteCv).toHaveBeenCalledWith(component.userId);
  }));
});
