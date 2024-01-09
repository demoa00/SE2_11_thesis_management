import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { APIService } from './api.service';
import { HttpService } from './http.service';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('APIService', () => {
  let apiService: APIService;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let location: Location;

  beforeEach(() => {
    const spyHttp = jasmine.createSpyObj('HttpService', ['formPost', 'get', 'post', 'put', 'delete', 'getBlob', 'postBlob', 'putBlob', 'deleteBlob']);
    const spyRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const spyLocation = jasmine.createSpyObj('Location', ['replaceState']);

    TestBed.configureTestingModule({
      providers: [
        APIService,
        { provide: HttpService, useValue: spyHttp },
        { provide: Router, useValue: spyRouter },
        { provide: Location, useValue: spyLocation }
      ]
    });
    
    apiService = TestBed.inject(APIService);
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>;
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  it('should handle successful login', fakeAsync(() => {
    const username = 'testUser';
    const password = 'testPassword';
    const mockResponse = { };

    httpServiceSpy.formPost.and.returnValue(Promise.resolve(mockResponse));

    spyOn(console, 'log');

    apiService.login(username, password);

    tick();

    expect(console.log).toHaveBeenCalledWith('response');
    expect(console.log).toHaveBeenCalledWith(mockResponse);
  }));

  it('should handle login error', fakeAsync(() => {
    const username = 'testUser';
    const password = 'testPassword';
    const mockError = new Error('Test error');

    httpServiceSpy.formPost.and.returnValue(throwError(mockError).toPromise());

    spyOn(console, 'log');

    apiService.login(username, password);

    tick();

    expect(console.log).toHaveBeenCalledWith('error');
    expect(console.log).toHaveBeenCalledWith(mockError);
  }));

  it('should check authorization and navigate to student page on success', fakeAsync(() => {
    const mockResponse = { role: 'student' };

    httpServiceSpy.get.and.returnValue(Promise.resolve(mockResponse));

    spyOn(localStorage, 'setItem');

    apiService.checkAutorization();

    tick();

    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockResponse));
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('student');
  }));

  it('should check authorization and navigate to professor page on success', fakeAsync(() => {
    const mockResponse = { role: 'professor' };

    httpServiceSpy.get.and.returnValue(Promise.resolve(mockResponse));

    spyOn(localStorage, 'setItem');

    apiService.checkAutorization();

    tick();

    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockResponse));
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('professor');
  }));

  it('should insert a new thesis successfully', async () => {
    const mockBody = {};
    const mockResponse = {};

    httpServiceSpy.post.and.returnValue(Promise.resolve(mockResponse));

    const result = await apiService.insertNewThesis(mockBody);

    expect(httpServiceSpy.post).toHaveBeenCalledWith('thesisProposals', mockBody);
    expect(result).toEqual(mockResponse);
  });

  it('should handle successful getApplications', async () => {
    const mockResponse = {};

    httpServiceSpy.get.and.returnValue(Promise.resolve(mockResponse));

    const result = await apiService.getApplications();

    expect(httpServiceSpy.get).toHaveBeenCalledWith('applications');
    expect(result).toEqual(mockResponse);
  });

  it('should handle error on getApplications', async () => {
    const mockError = new Error('Test Error');

    httpServiceSpy.get.and.returnValue(Promise.reject(mockError));

    const result = await apiService.getApplications();

    expect(result).toBeUndefined();
  });

  it('should get application by ID successfully', async () => {
    const applicationId = 123;
    const userId = 456;
    const mockResponse = {};
  
    httpServiceSpy.get.and.returnValue(Promise.resolve(mockResponse));
  
    const result = await apiService.getApplicationById(applicationId, userId);
  
    expect(httpServiceSpy.get).toHaveBeenCalledWith(`applications/${applicationId}/${userId}`);
    expect(result).toEqual(mockResponse);
  });

  it('should set professor in localStorage on successful API call', async () => {
    const mockUser = { userId: 123 };
    const mockResponse = {};
  
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));
  
    httpServiceSpy.get.and.returnValue(Promise.resolve(mockResponse));
  
    spyOn(localStorage, 'setItem');
  
    await apiService.setProfessor();
  
    expect(httpServiceSpy.get).toHaveBeenCalledWith(`professors/${mockUser.userId}`, false, true);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect((localStorage.setItem as jasmine.Spy).calls.mostRecent().args).toEqual(['professor', JSON.stringify(mockResponse)]);
  });

  it('should set student details in local storage', fakeAsync(() => {
    const mockUser = { userId: '123', role: 'student' };
    const mockStudentDetails = { studentId: '123', name: 'John Doe' };
  
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));
    httpServiceSpy.get.and.returnValue(Promise.resolve(mockStudentDetails));
    spyOn(localStorage, 'setItem');
  
    apiService.setStudent();
  
    tick();
  
    expect(localStorage.getItem).toHaveBeenCalledWith('user');
    expect(httpServiceSpy.get).toHaveBeenCalledWith(`students/${mockUser.userId}`, false, true);
    expect(localStorage.setItem).toHaveBeenCalledWith('student', JSON.stringify(mockStudentDetails));
  }));

  it('should handle successful getDegrees', async () => {
    const mockResponse = [{ id: 1, name: 'Degree 1' }, { id: 2, name: 'Degree 2' }];
  
    httpServiceSpy.get.and.returnValue(Promise.resolve(mockResponse));
  
    spyOn(localStorage, 'setItem');
  
    await apiService.getDegrees();
  
    expect(httpServiceSpy.get).toHaveBeenCalledWith('degrees/', false, true);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect((localStorage.setItem as jasmine.Spy).calls.mostRecent().args).toEqual(['degrees', JSON.stringify(mockResponse)]);
  });

  it('should handle successful getExternalCoSupervisors', fakeAsync(() => {
    const mockResponse = {};

    httpServiceSpy.get.and.returnValue(Promise.resolve(mockResponse));

    spyOn(localStorage, 'setItem');

    let result: any;

    apiService.getExternalCoSupervisors().then((response) => {
      result = response;
    });

    tick();

    expect(httpServiceSpy.get).toHaveBeenCalledWith('externalCoSupervisors/', false, true);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect((localStorage.setItem as jasmine.Spy).calls.mostRecent().args).toEqual(['externalCoSupervisors', JSON.stringify(mockResponse)]);
    expect(result).toEqual(mockResponse);
  }));

  it('should handle successful getCoSupervisors', async () => {
    const mockResponse = [{}, {}]; // Mock response data
  
    httpServiceSpy.get.and.returnValue(Promise.resolve(mockResponse));

    spyOn(localStorage, 'setItem');
  
    const result = await apiService.getCoSupervisors();
  
    expect(httpServiceSpy.get).toHaveBeenCalledWith('professors/?cosupervisor=true', false, true);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect((localStorage.setItem as jasmine.Spy).calls.mostRecent().args).toEqual(['coSupervisors', JSON.stringify(mockResponse)]);
    expect(result).toEqual(mockResponse);
  });

  it('should handle error on getAllActiveTheses', async () => {
    const mockError = new Error('Test Error');
  
    httpServiceSpy.get.and.returnValue(Promise.reject(mockError));
  
    const result = await apiService.getAllActiveTheses();
  
    expect(result).toBeUndefined();
  });

  it('should handle successful getAllArchivedTheses', async () => {
    const mockResponse = {};
  
    httpServiceSpy.get.and.returnValue(Promise.resolve(mockResponse));
  
    const result = await apiService.getAllArchivedTheses();
  
    expect(httpServiceSpy.get).toHaveBeenCalledWith('thesisProposals/?cosupervisor=false&isArchieved=true');
    expect(result).toEqual(mockResponse);
  });

  it('should handle error on getAllArchivedTheses', async () => {
    const mockError = new Error('Test Error');
  
    httpServiceSpy.get.and.returnValue(Promise.reject(mockError));
  
    const result = await apiService.getAllArchivedTheses();
  
    expect(result).toBeUndefined();
  });

  it('should get user details successfully', async () => {
    const userId = 'testUserId';
    const mockResponse = {};
  
    httpServiceSpy.get.and.returnValue(Promise.resolve(mockResponse));
  
    const result = await apiService.getUserDetails(userId);
  
    expect(httpServiceSpy.get).toHaveBeenCalledWith(`students/${userId}`, false, true);
    expect(result).toEqual(mockResponse);
  });

  it('should get professor details successfully', async () => {
    const mockUserId = 123;
    const mockResponse = {};

    httpServiceSpy.get.and.returnValue(Promise.resolve(mockResponse));

    const result = await apiService.getProfessorDetails(mockUserId);

    expect(httpServiceSpy.get).toHaveBeenCalledWith(`professors/${mockUserId}`, false, true);
    expect(result).toEqual(mockResponse);
  });

  it('should get all proposals successfully with parameters', async () => {
    const mockParams = {
      text: 'testText',
      supervisors: [{ professorId: 1 }, { professorId: 2 }],
      cosupervisors: [{ professorId: 3 }, { externalCoSupervisorId: 4 }],
      expirationDate: '2024-01-09',
      abroad: true,
    };
    const mockResponse = [{ proposalId: 1, title: 'Proposal 1' }, { proposalId: 2, title: 'Proposal 2' }];
  
    httpServiceSpy.get.and.returnValue(Promise.resolve(mockResponse));
  
    const result = await apiService.getAllProposals(mockParams);
  
    const expectedUrl =
      'thesisProposals/?supervisor=1&supervisor=2&cosupervisor=3&cosupervisor=4&expirationdate=2024-01-09&abroad=true&text=testText&';
  
    expect(httpServiceSpy.get).toHaveBeenCalledWith(expectedUrl, false, true);
    expect(result).toEqual(mockResponse);
  });







  it('should get proposal successfully', async () => {
    const proposalId = 123;
    const mockResponse = {};
  
    httpServiceSpy.get.and.returnValue(Promise.resolve(mockResponse));
  
    const result = await apiService.getProposal(proposalId);
  
    expect(httpServiceSpy.get).toHaveBeenCalledWith(`thesisProposals/${proposalId}`, false, true);
    expect(result).toEqual(mockResponse);
  });

  it('should delete a thesis successfully', async () => {
    const proposalId = 123;
    const mockResponse = {};
  
    httpServiceSpy.delete.and.returnValue(Promise.resolve(mockResponse));
  
    const result = await apiService.deleteThesis(proposalId);
  
    expect(httpServiceSpy.delete).toHaveBeenCalledWith(`thesisProposals/${proposalId}`, true);
    expect(result).toEqual(mockResponse);
  });

  it('should archive a thesis successfully', async () => {
    const proposalId = 1;
    const mockThesisBody = {};
    const mockArchiveResponse = {};

    httpServiceSpy.get.and.returnValue(Promise.resolve(mockThesisBody));
    httpServiceSpy.put.and.returnValue(Promise.resolve(mockArchiveResponse));

    const result = await apiService.archiveThesis(proposalId);

    expect(httpServiceSpy.get).toHaveBeenCalledWith(`thesisProposals/${proposalId}`, false, true);
    expect(httpServiceSpy.put).toHaveBeenCalledWith(`thesisProposals/${proposalId}/archive`, mockThesisBody);
    expect(result).toEqual(mockArchiveResponse);
  });

  it('should handle successful getProfessors', async () => {
    const mockResponse = [{}];
  
    httpServiceSpy.get.and.returnValue(Promise.resolve(mockResponse));

    spyOn(localStorage, 'setItem');
  
    const result = await apiService.getProfessors();
  
    expect(httpServiceSpy.get).toHaveBeenCalledWith('professors', false, true);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect((localStorage.setItem as jasmine.Spy).calls.mostRecent().args).toEqual(['professors', JSON.stringify(mockResponse)]);
    expect(result).toEqual(mockResponse);
  });

  it('should get supervisors successfully', async () => {
    const mockResponse = {};
  
    httpServiceSpy.get.and.returnValue(Promise.resolve(mockResponse));
  
    const result = await apiService.getSupervisors();
  
    expect(httpServiceSpy.get).toHaveBeenCalledWith('professors/?cosupervisor=false');
  
    expect(result).toEqual(mockResponse);
  });

  it('should insert a new application successfully', async () => {
    const mockBody = { thesisProposalId: 123 };
    const mockResponse = {};

    httpServiceSpy.post.and.returnValue(Promise.resolve(mockResponse));

    const result = await apiService.insertNewApplication(mockBody);

    expect(httpServiceSpy.post).toHaveBeenCalledWith(`thesisProposals/${mockBody.thesisProposalId}`, mockBody);
    expect(result).toEqual(mockResponse);
  });

  it('should handle successful putApplication', async () => {
    const studentId = 'testStudentId';
    const thesisProposalId = 'testThesisProposalId';
    const status = 'Accepted';
    const mockResponse = {};

    httpServiceSpy.put.and.returnValue(Promise.resolve(mockResponse));

    const result = await apiService.putApplication(studentId, thesisProposalId, status);

    expect(httpServiceSpy.put).toHaveBeenCalledWith(`applications/${thesisProposalId}/${studentId}`, {
      thesisProposalId: thesisProposalId,
      applicant: {
        studentId: studentId
      },
      status: status
    });
    expect(result).toEqual(mockResponse);
  });

  it('should handle successful getCareer', async () => {
    const studentId = 'testStudentId';
    const mockResponse = {};
  
    httpServiceSpy.get.and.returnValue(Promise.resolve(mockResponse));
  
    const result = await apiService.getCareer(studentId);
  
    expect(httpServiceSpy.get).toHaveBeenCalledWith(`careers/${studentId}`, false, true);
    expect(result).toEqual(mockResponse);
  });

  it('should update notification successfully', async () => {
    const notificationId = 'testNotificationId';
    const mockResponse = {};

    httpServiceSpy.put.and.returnValue(Promise.resolve(mockResponse));

    const result = await apiService.updateNotification(notificationId);

    expect(httpServiceSpy.put).toHaveBeenCalledWith(`notifications/${notificationId}`, {});
    expect(result).toEqual(mockResponse);
  });

  it('should update thesis successfully', async () => {
    const thesisProposalId = 1;
    const mockSubmitForm = {
      coSupervisor: [{ coSupervisorId: 2 }],
      abroad: true,
      requirements: 'Sample requirements',
      CdS: [{ degreeId: 3 }],
      notes: 'Sample notes',
      keywords: ['keyword1', 'keyword2'],
      level: 'Sample level',
      thesisType: 'Sample type',
      description: 'Sample description',
      title: 'Sample title',
      expirationDate: '2024-12-31',
    };
    const mockResponse = {};
  
    httpServiceSpy.put.and.returnValue(Promise.resolve(mockResponse));
  
    const result = await apiService.updateThesis(thesisProposalId, mockSubmitForm);
  
    expect(httpServiceSpy.put).toHaveBeenCalledWith(`thesisProposals/${thesisProposalId}`, mockSubmitForm);
    expect(result).toEqual(mockResponse);
  });
  
  it('should post a new CV successfully', async () => {
    const mockBody = {};
    const mockResponse = {};
  
    httpServiceSpy.postBlob.and.returnValue(Promise.resolve(mockResponse));
  
    const result = await apiService.postCv(mockBody);
  
    expect(httpServiceSpy.postBlob).toHaveBeenCalledWith('cv', mockBody, {
      enctype: 'multipart/form-data',
      accept: 'application/pdf',
    });
    expect(result).toEqual(mockResponse);
  });

  it('should get CV successfully', async () => {
    const mockUserId = 'testUserId';
    const mockBlob = new Blob(['Test CV Content'], { type: 'application/pdf' });

    httpServiceSpy.getBlob.and.returnValue(Promise.resolve(mockBlob));

    const result = await apiService.getCv(mockUserId);

    expect(httpServiceSpy.getBlob).toHaveBeenCalledWith(`cv/${mockUserId}`, false, true);
    expect(result instanceof Blob).toBe(true);
  });

  it('should delete CV successfully', async () => {
    const userId = 'testUserId';
  
    httpServiceSpy.delete.and.returnValue(Promise.resolve({}));
  
    const result = await apiService.deleteCv(userId);
  
    expect(httpServiceSpy.delete).toHaveBeenCalledWith(`cv/${userId}`, true);
    expect(result).toEqual({});
  });

  it('should update virtual clock successfully', async () => {
    const mockDate = '2024-01-09';
    const mockResponse = {};
  
    httpServiceSpy.put.and.returnValue(Promise.resolve(mockResponse));
  
    const result = await apiService.putVirtualClock(mockDate);
  
    expect(httpServiceSpy.put).toHaveBeenCalledWith('virtualClock', { date: mockDate });
    expect(result).toEqual(mockResponse);
  });
});
