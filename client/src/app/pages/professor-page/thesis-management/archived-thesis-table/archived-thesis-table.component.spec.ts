import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedThesisTableComponent } from './archived-thesis-table.component';

describe('ArchivedThesisTableComponent', () => {
  let component: ArchivedThesisTableComponent;
  let fixture: ComponentFixture<ArchivedThesisTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchivedThesisTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArchivedThesisTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
