import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { StudentPageComponent } from './student-page.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('StudentPageComponent', () => {
  let component: StudentPageComponent;
  let fixture: ComponentFixture<StudentPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [StudentPageComponent]
    });
    fixture = TestBed.createComponent(StudentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should update searchValue on ngModelChange", fakeAsync(() => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('#search-input');

    fixture.detectChanges();
    tick();

    inputElement.value = 'New Value';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    expect(component.searchValue).toEqual('new value');
  }));

  it("should update keywordsSearchValue on ngModelChange", fakeAsync(() => {
    component.keywordsHover = true;

    fixture.detectChanges();
    tick();

    const inputDebugElement = fixture.debugElement.query(By.css('#keywordsSearch-input'));
    const inputElement: HTMLInputElement = inputDebugElement.nativeElement;

    fixture.detectChanges();
    tick();

    inputElement.value = 'New Value';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    expect(component.keywordsSearchValue).toEqual('new value');
  }));

  it("should update professorsSearchValue on ngModelChange", fakeAsync(() => {
    component.professorsHover = true;

    fixture.detectChanges();
    tick();

    const inputDebugElement = fixture.debugElement.query(By.css('#professorsSearch-input'));
    const inputElement: HTMLInputElement = inputDebugElement.nativeElement;

    fixture.detectChanges();
    tick();

    inputElement.value = 'New Value';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    expect(component.professorsSearchValue).toEqual('new value');
  }));

  it("should trigger updateSearchValue on input change", fakeAsync(() => {
    const searchInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#search-input');

    fixture.detectChanges();
    tick();

    spyOn(component, 'updateSearchValue');

    searchInputElement.value = 'new value';
    searchInputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    expect(component.updateSearchValue).toHaveBeenCalledWith('new value');
  }));

  it("should trigger updateKeywordsSearchValue on input change", fakeAsync(() => {
    component.keywordsHover = true;

    fixture.detectChanges();
    tick();

    const inputDebugElement = fixture.debugElement.query(By.css('#keywordsSearch-input'));
    const inputElement: HTMLInputElement = inputDebugElement.nativeElement;

    fixture.detectChanges();
    tick();

    spyOn(component, 'updateKeywordsSearchValue');

    inputElement.value = 'new value';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    expect(component.updateKeywordsSearchValue).toHaveBeenCalledWith('new value');
  }));

  it("should trigger updateProfessorsSearchValue on input change", fakeAsync(() => {
    component.professorsHover = true;

    fixture.detectChanges();
    tick();

    const inputDebugElement = fixture.debugElement.query(By.css('#professorsSearch-input'));
    const inputElement: HTMLInputElement = inputDebugElement.nativeElement;

    fixture.detectChanges();
    tick();

    spyOn(component, 'updateProfessorsSearchValue');

    inputElement.value = 'new value';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    expect(component.updateProfessorsSearchValue).toHaveBeenCalledWith('new value');
  }));

  it("should filter project based on selected keywords and names", () => {
    //Set up test data
    component.projects = [
      { title: 'Study of neural networks', name: 'David Lee', keywords: ['neural', 'networks'] },
      { title: 'Study on modern medicine', name: 'David Wilson', keywords: ['medicine'] },
      { title: 'Development of a web application', name: 'Alice Johnson', keywords: ['web', 'application'] }
    ];

    component.toggleKeyword('web');
    component.toggleName('Alice Johnson');

    component.updateProjectsToShow();

    expect(component.projectsToShow).toEqual([
      { title: 'Development of a web application', name: 'Alice Johnson', keywords: ['web', 'application'] }
    ]);
  });

  it("should add and remove items from selectedKeywords when toggleKeyword is called", () => {
    //Initial state
    expect(component.selectedKeywords.size).toBe(0);

    //Call toggleKeyword to add an item
    component.toggleKeyword('web');
    expect(component.selectedKeywords.size).toBe(1);
    expect(component.selectedKeywords.has('web')).toBeTruthy();

    //Call toggleKeyword again to remove the item
    component.toggleKeyword('web');
    expect(component.selectedKeywords.size).toBe(0);
    expect(component.selectedKeywords.has('web')).toBeFalsy();
  });

  it('should add and remove items from selectedNames when toggleName is called', () => {
    // Initial state
    expect(component.selectedNames.size).toBe(0);
  
    // Call toggleName to add an item
    component.toggleName('Alice Johnson');
    expect(component.selectedNames.size).toBe(1);
    expect(component.selectedNames.has('Alice Johnson')).toBe(true);
  
    // Call toggleName again to remove the item
    component.toggleName('Alice Johnson');
    expect(component.selectedNames.size).toBe(0);
    expect(component.selectedNames.has('Alice Johnson')).toBe(false);
  });

  it('should call updateProjectsToShow when toggling keyword', () => {
    // Set up spy on updateProjectsToShow
    spyOn(component, 'updateProjectsToShow');
  
    // Toggle a keyword
    component.toggleKeyword('web');
  
    // Expect updateProjectsToShow to have been called
    expect(component.updateProjectsToShow).toHaveBeenCalled();
  });
  
  it('should call updateProjectsToShow when toggling name', () => {
    // Set up spy on updateProjectsToShow
    spyOn(component, 'updateProjectsToShow');
  
    // Toggle a name
    component.toggleName('Alice Johnson');
  
    // Expect updateProjectsToShow to have been called
    expect(component.updateProjectsToShow).toHaveBeenCalled();
  });

  it('should update the selected state of menu items when selectMenuItem is called', fakeAsync(() => {
    // Initial state
    expect(component.menuItems[0].selected).toBe(true);
    expect(component.menuItems[1].selected).toBe(false);
    expect(component.menuItems[2].selected).toBe(false);
  
    // Call selectMenuItem to select a different menu item
    component.selectMenuItem(3);
    fixture.detectChanges();
    tick();
  
    // Expect the selected state to be updated
    expect(component.menuItems[0].selected).toBe(false);
    expect(component.menuItems[1].selected).toBe(false);
    expect(component.menuItems[2].selected).toBe(true);
  }));

  it('should clear selectedKeywords and selectedNames and update projectsToShow', () => {
    // Set up initial state
    component.selectedKeywords = new Set<string>(['keyword1', 'keyword2']);
    component.selectedNames = new Set<string>(['name1', 'name2']);
  
    // Trigger the deleteFilters method
    component.deleteFilters();
  
    // Check if sets are cleared and projectsToShow is updated
    expect(component.selectedKeywords.size).toBe(0);  // Ensure selectedKeywords set is cleared
    expect(component.selectedNames.size).toBe(0);      // Ensure selectedNames set is cleared
    expect(component.projectsToShow).toEqual(component.projects);  // Ensure projectsToShow is reset to all projects
  });
  
  it('should show/hide and update values for keyword dropdown', fakeAsync(() => {
    // Ensure initial state
    component.keywordsHover = false;
    const initialKeywordsSearchValue = 'initialKeyword';
    component.keywordsSearchValue = initialKeywordsSearchValue;

    // Simulate mouse enter and input event on the keyword dropdown
    component.keywordsHover = true;
    fixture.detectChanges();
    tick();
    
    const keywordsInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#keywordsSearch-input');
    keywordsInputElement.value = 'updatedKeyword';
    keywordsInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();

    // Check if dropdown is shown, value is updated
    expect(component.keywordsHover).toBeTrue();  // Ensure dropdown is shown
    expect(component.keywordsSearchValue).toBe('updatedkeyword');  // Ensure value is updated
  }));

  it('should show/hide and update values for professor dropdown', fakeAsync(() => {
    // Ensure initial state
    component.professorsHover = false;
    const initialProfessorsSearchValue = 'initialProfessor';
    component.professorsSearchValue = initialProfessorsSearchValue;

    // Simulate mouse enter and input event on the professor dropdown
    component.professorsHover = true;
    fixture.detectChanges();
    tick();

    const professorsInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#professorsSearch-input');
    professorsInputElement.value = 'updatedProfessor';
    professorsInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();

    // Check if dropdown is shown, value is updated
    expect(component.professorsHover).toBeTrue();  // Ensure dropdown is shown
    expect(component.professorsSearchValue).toBe('updatedprofessor');  // Ensure value is updated
  }));

  it('should handle click event for delete filters button correctly', fakeAsync(() => {
    component.selectedKeywords.add('keyword1');
    component.selectedNames.add('professor1');
    fixture.detectChanges();
    tick();
  
    // Trigger click event
    const deleteFiltersButton: HTMLElement = fixture.nativeElement.querySelector('.deleteFilters');
    deleteFiltersButton.click();
    fixture.detectChanges();
    tick();

    expect(component.selectedKeywords.size).toBe(0);
    expect(component.selectedNames.size).toBe(0);
  }));

  it('should display all projects when no filters are applied', () => {
    component.selectedKeywords.clear();
    component.selectedNames.clear();
  
    component.updateProjectsToShow();
  
    expect(component.projectsToShow.length).toBe(component.projects.length);
  });
});
