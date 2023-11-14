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
    { title: 'Intelligent systems design', name: 'Eva Smith', keywords: ['systems', 'IA', 'AI', 'neural'] },
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
  projectsToShow = new Set(this.projects);
  notFilteredProjects = new Set(this.projectsToShow);
  selectedProject: Project | null = null;
  professorNames = new Set(this.projects.map(project => project.name));
  keywords = new Set(this.projects.map(project => project.keywords).flat());
  selectedKeywords = new Set<string>();
  selectedNames = new Set<string>();
  showSuccessAlert = false;
  showDangerAlert = false;
  alertContent = "";

  keywordsHover = false;
  professorsHover = false;
  menuItems = [
    { id: 1, hover: false, selected: true  },
    { id: 2, hover: false, selected: false },
    { id: 3, hover: false, selected: false }
  ];
  professorsSearchValue = "";
  keywordsSearchValue = "";

  // toggleKeyword(keyword: string) {
  //   this.selectedKeywords.has(keyword) ? this.selectedKeywords.delete(keyword) : this.selectedKeywords.add(keyword);
  //   this.updateProjectsToShow()
  // }

  toggleName(keyword: string) {
    this.selectedNames.has(keyword) ? this.selectedNames.delete(keyword) : this.selectedNames.add(keyword);
    console.log(this.notFilteredProjects)
    if(this.selectedNames.size === 0){
      this.projectsToShow = new Set(this.notFilteredProjects);
    }
    else {
      this.projectsToShow = new Set(this.notFilteredProjects);
      this.projects.forEach(project => {
        if (this.selectedNames.has(project.name)) {
          this.projectsToShow.add(project);
        }
      })
    }
  }

  updateSearchValue(value: string) {
    // this.searchValue = value.trim().toLowerCase();
    this.projectsToShow = new Set();
    if(value){
      this.projects.forEach(project => {
        value.trim().split(' ').forEach(word => {
          if (project.title.toLowerCase().includes(word)) {
            this.projectsToShow.add(project);
          }
          else {
            project.keywords.some(keyword => {
              if (keyword.toLowerCase().includes(word)) {
                this.projectsToShow.add(project);
              }
            })
          }
        })
      })
    }
    else{
      this.projectsToShow = new Set(this.projects);
    }
    this.notFilteredProjects = new Set(this.projectsToShow);
  }

  deleteFilters() {
    this.selectedNames.clear();
    this.projectsToShow = new Set(this.notFilteredProjects);
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
  setToString(object: Set<any>) {
    return Array.from(object).join(', ');
  }

  showAlert(value: string) {
    if(value === 'success'){
      this.showSuccessAlert = true;
    }
    else {
      this.showDangerAlert = true;
    }
    setTimeout(() => {
      this.showSuccessAlert = false;
      this.showDangerAlert = false;
      this.selectedProject = null;
    }, 3000);
  }

}
type Project = {
  title: string,
  name: string
};