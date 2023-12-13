import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorPageComponent } from './professor-page.component';
import { ThesisManagementComponent } from './thesis-management/thesis-management.component';
import { PageSkeletonComponent } from 'src/app/shared/components/page-skeleton/page-skeleton.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { NotificationsContainerComponent } from 'src/app/shared/components/notification/container/notifications-container/notifications-container.component';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';

class mockSocket {
  on(event: String): Observable<any> {
    return new Observable();
  }
}

describe('ProfessorPageComponent', () => {
  let component: ProfessorPageComponent;
  let fixture: ComponentFixture<ProfessorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatIconModule],
      declarations: [ProfessorPageComponent, ThesisManagementComponent, PageSkeletonComponent, IconComponent, NotificationsContainerComponent],
      providers: [{ provide: Socket, useClass: mockSocket }]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessorPageComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update selected property on menu item click', () => {
    component.selectMenuItem(2);

    expect(component.menuItems[0].selected).toBe(false);
    expect(component.menuItems[1].selected).toBe(true);
    expect(component.menuItems[2].selected).toBe(false);

    component.selectMenuItem(3);

    expect(component.menuItems[0].selected).toBe(false);
    expect(component.menuItems[1].selected).toBe(false);
    expect(component.menuItems[2].selected).toBe(true);
  });
});
