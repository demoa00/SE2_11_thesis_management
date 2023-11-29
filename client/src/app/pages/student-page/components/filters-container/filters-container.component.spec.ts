import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersContainerComponent } from './filters-container.component';

describe('FiltersContainerComponent', () => {
  let component: FiltersContainerComponent;
  let fixture: ComponentFixture<FiltersContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltersContainerComponent]
    });
    fixture = TestBed.createComponent(FiltersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
