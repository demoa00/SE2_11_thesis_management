import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { ButtonSliderComponent } from './button-slider.component';
import { IconComponent } from '../icon/icon.component';
import { CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';

describe('ButtonSliderComponent', () => {
  let component: ButtonSliderComponent;
  let fixture: ComponentFixture<ButtonSliderComponent>;

  beforeEach(() => {
      TestBed.configureTestingModule({
          declarations: [ButtonSliderComponent, IconComponent]
      });
      fixture = TestBed.createComponent(ButtonSliderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
  });

  it('should create', () => {
      expect(component).toBeTruthy();
  });

  it('should update messageSendable property on drag', () => {
      const dragMoveEvent: CdkDragMove = {
        source: {
          getFreeDragPosition: () => ({ x: 114, y: 0 }),
        },
      } as any;
    
      component.takePosition(dragMoveEvent);
  
      expect(component.messageSendable).toBe(true);
  });

  it('should emit buttonSliderSubmit event when message is sendable', fakeAsync(() => {
    spyOn(component.buttonSliderSubmit, 'emit');

    const dragMoveEvent: CdkDragMove = {
      source: {
        getFreeDragPosition: () => ({ x: 114, y: 0 }),
      },
    } as any;

    component.takePosition(dragMoveEvent);

    const dragEndEvent: CdkDragEnd = {
      source: {
        setFreeDragPosition: () => {},
      },
    } as any;

    component.checkDragEnd(dragEndEvent);

    tick(1999); // Use 1999 instead of 2000 to avoid reaching the exact time point
    flush();

    expect(component.buttonSliderSubmit.emit).toHaveBeenCalledWith(true);
  }));

  it('should set messageSendable to false when x is less than 113', () => {
    const dragMoveEvent: CdkDragMove = {
      source: {
        getFreeDragPosition: () => ({ x: 112, y: 0 }),
      },
    } as any;

    component.takePosition(dragMoveEvent);

    expect(component.messageSendable).toBe(false);
  });
});