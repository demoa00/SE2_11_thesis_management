import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedThesisTableComponent } from './archived-thesis-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ArchivedThesisTableComponent', () => {
  let component: ArchivedThesisTableComponent;
  let fixture: ComponentFixture<ArchivedThesisTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ArchivedThesisTableComponent]
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
