import { Component } from '@angular/core';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent {
  projects =  [
    { title: 'Analysis of climate data', name: 'Charlie Smith', keywords: ['climate'] },
    { title: 'Development of a web application', name: 'Alice Johnson', keywords: ['web', 'application'] },
    { title: 'Renewable energy research', name: 'Eva Brown', keywords: ['renewable', 'energy'] },
    { title: 'Study on modern medicine', name: 'David Wilson', keywords: ['medicine'] },
    { title: 'Global economic analysis', name: 'Bob Lee', keywords: ['economy'] },
    { title: 'Intelligent systems design', name: 'Eva Smith', keywords: ['systems'] },
    { title: 'Development of new green technologies', name: 'Alice Johnson', keywords: ['green', 'development'] },
    { title: 'Study of neural networks', name: 'David Lee', keywords: ['neural', 'networks'] },
    { title: 'Nanotechnology research', name: 'Alice Johnson', keywords: ['nanotechnology'] },
    { title: 'Analysis of public policies', name: 'David Wilson', keywords: ['policies'] }
  ];

  notifications = [
    { title: 'Analysis of climate data', name: 'Charlie Smith', state: 'accepted' },
    { title: 'Development of a web application', name: 'Alice Johnson', state: 'rejected' },
    { title: 'Renewable energy research', name: 'Eva Brown', state: 'accepted' },
  ];

  searchValue: string = "";
  projectsToShow = this.projects;
  selectedProject: Project | null = null;
  professorNames = new Set(this.projects.map(project => project.name));
  keywords = new Set(this.projects.map(project => project.keywords).flat());
  selectedKeywords = new Set<string>();
  selectedNames = new Set<string>();

  keywordsHover = false;
  professorsHover = false;
  menuItems = [
    { id: 1, hover: false, selected: true  },
    { id: 2, hover: false, selected: false },
    { id: 3, hover: false, selected: false }
  ];
  professorsSearchValue = "";
  keywordsSearchValue = "";

  toggleKeyword(keyword: string) {
    this.selectedKeywords.has(keyword) ? this.selectedKeywords.delete(keyword) : this.selectedKeywords.add(keyword);
    this.updateProjectsToShow()
  }

  toggleName(keyword: string) {
    this.selectedNames.has(keyword) ? this.selectedNames.delete(keyword) : this.selectedNames.add(keyword);
    this.updateProjectsToShow()
  }

  updateProjectsToShow() {
    if (this.selectedKeywords.size === 0 && this.selectedNames.size === 0) {
      this.projectsToShow = this.projects;
    }
    else {
      this.projectsToShow = this.projects.filter(
        project =>
          project.keywords.some(keyword =>
            this.selectedKeywords.has(keyword)) ||
            this.selectedNames.has(project.name));
    }
  }

  updateSearchValue(value: string) {
    this.searchValue = value.trim().toLowerCase();
  }

  deleteFilters() {
    this.selectedKeywords.clear();
    this.selectedNames.clear();
    this.updateProjectsToShow();
  }

  selectMenuItem(id: number) {
    this.menuItems.forEach(item => {
      item.selected = item.id === id;
    });
  }

  updateProfessorsSearchValue(name: string) {
    this.professorsSearchValue = name.trim().toLowerCase();
  }

  updateKeywordsSearchValue(keyword: string) {
    this.keywordsSearchValue = keyword.trim().toLowerCase();
  }

  selectProject(project: any) {
    this.selectedProject = project;
  }

  objectToString(object: any) {
    return JSON.stringify(object);
  }

}
type Project = {
  title: string,
  name: string
};
