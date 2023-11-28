import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { StudentPageComponent } from './student-page.component';
import { FormsModule } from '@angular/forms';
import { PageSkeletonComponent } from 'src/app/shared/components/page-skeleton/page-skeleton.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { MatIconModule } from '@angular/material/icon';

describe('StudentPageComponent', () => {
  let component: StudentPageComponent;
  let fixture: ComponentFixture<StudentPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule, MatIconModule],
      declarations: [StudentPageComponent, PageSkeletonComponent, ButtonComponent]
    });
    fixture = TestBed.createComponent(StudentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should show success alert', () => {
  //   component.showAlert('success');

  //   expect(component.showSuccessAlert).toBe(true);
  //   expect(component.showDangerAlert).toBe(false);
  // });

  // it('should show error alert', () => {
  //   component.showAlert('error');

  //   expect(component.showSuccessAlert).toBe(false);
  //   expect(component.showDangerAlert).toBe(true);
  // });

  // it('should show and hide success alert after a certain timeout', fakeAsync(() => {
  //   component.showAlert('success');

  //   expect(component.showSuccessAlert).toBe(true);

  //   tick(3000);

  //   expect(component.showSuccessAlert).toBe(false);
  // }));

  // it('should show and hide error alert after a certain timeout', fakeAsync(() => {
  //   component.showAlert('error');

  //   expect(component.showDangerAlert).toBe(true);

  //   tick(3000);

  //   expect(component.showDangerAlert).toBe(false);
  // }));

  // it('should update selectedProject when selectProject is called', () => {
  //   const mockProject = { title: 'Mock Project', name: 'Mock Professor' };
  
  //   component.selectProject(mockProject);
  
  //   expect(component.selectedProject).toEqual(mockProject);
  // });

  it('should call updateSearchValue on ngModelChange for search input', () => {
    const mockInputValue = 'mockSearchValue';
  
    component.updateSearchValue = jasmine.createSpy('updateSearchValue');  // Spy on the method
    const searchInput = fixture.nativeElement.querySelector('#search-input');
    searchInput.value = mockInputValue;
    searchInput.dispatchEvent(new Event('input'));
  
    expect(component.updateSearchValue).toHaveBeenCalledWith(mockInputValue);
  });

  // it('should update displayed projects when updateSearchValue is called', () => {
  //   const mockProjects = [
  //     { title: 'Project 1', name: 'Professor A', keywords: ['keyword1'] },
  //     { title: 'Project 2', name: 'Professor B', keywords: ['keyword2'] },
  //   ];
  
  //   component.projects = mockProjects;
  
  //   const mockSearchValue = 'keyword1';
  //   component.updateSearchValue(mockSearchValue);
  
  //   expect(component.projectsToShow.size).toBe(1);
  //   expect(component.projectsToShow.has(mockProjects[0])).toBe(true);
  // });

  // it('should update displayed projects when deleteFilters is called', () => {
  //   const mockProjects = [
  //     { title: 'Analysis of climate data', name: 'Charlie Smith', keywords: ['climate'] },
  //     { title: 'Development of a web application', name: 'Alice Johnson', keywords: ['web', 'application'] },
  //     { title: 'Renewable energy research', name: 'Eva Brown', keywords: ['renewable', 'energy'] },
  //     { title: 'Study on modern medicine', name: 'David Wilson', keywords: ['medicine'] },
  //     { title: 'Global economic analysis', name: 'Bob Lee', keywords: ['economy'] },
  //     { title: 'Intelligent systems design', name: 'Eva Smith', keywords: ['systems', 'IA', 'AI', 'neural'] },
  //     { title: 'Development of new green technologies', name: 'Alice Johnson', keywords: ['green', 'development'] },
  //     { title: 'Study of neural networks', name: 'David Lee', keywords: ['neural', 'networks'] },
  //     { title: 'Nanotechnology research', name: 'Alice Johnson', keywords: ['nanotechnology'] },
  //     { title: 'Analysis of public policies', name: 'David Wilson', keywords: ['policies'] }
  //   ];
  
  //   component.projects = mockProjects;
  //   component.selectedNames.add('David Wilson');
  
  //   component.deleteFilters();
  
  //   expect(component.projectsToShow.size).toBe(mockProjects.length);
  // });

  // it('should update displayed projects when toggleName is called', () => {
  //   const mockProjects = [
  //     { title: 'Analysis of climate data', name: 'Charlie Smith', keywords: ['climate'] },
  //     { title: 'Development of a web application', name: 'Alice Johnson', keywords: ['web', 'application'] },
  //     { title: 'Renewable energy research', name: 'Eva Brown', keywords: ['renewable', 'energy'] },
  //     { title: 'Study on modern medicine', name: 'David Wilson', keywords: ['medicine'] },
  //     { title: 'Global economic analysis', name: 'Bob Lee', keywords: ['economy'] },
  //     { title: 'Intelligent systems design', name: 'Eva Smith', keywords: ['systems', 'IA', 'AI', 'neural'] },
  //     { title: 'Development of new green technologies', name: 'Alice Johnson', keywords: ['green', 'development'] },
  //     { title: 'Study of neural networks', name: 'David Lee', keywords: ['neural', 'networks'] },
  //     { title: 'Nanotechnology research', name: 'Alice Johnson', keywords: ['nanotechnology'] },
  //     { title: 'Analysis of public policies', name: 'David Wilson', keywords: ['policies'] }
  //   ];
  
  //   component.projects = mockProjects;
  
  //   const mockProfessorName = 'Eva Brown';
  //   component.toggleName(mockProfessorName);
  
  //   expect(component.projectsToShow.size).toBe(1);
  // });

  // it('should update selected menu item when selectMenuItem is called', () => {
  //   const mockMenuItems = [
  //     { id: 1, hover: false, selected: true },
  //     { id: 2, hover: false, selected: false },
  //     { id: 3, hover: false, selected: false },
  //   ];
  
  //   component.menuItems = mockMenuItems;
  
  //   const mockMenuItemId = 2;
  //   component.selectMenuItem(mockMenuItemId);
  
  //   expect(component.menuItems[0].selected).toBe(false);
  //   expect(component.menuItems[1].selected).toBe(true);
  //   expect(component.menuItems[2].selected).toBe(false);
  // });
});