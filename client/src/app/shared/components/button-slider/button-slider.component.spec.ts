import { ComponentFixture, TestBed, fakeAsync, flushMicrotasks, tick } from '@angular/core/testing';
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

    it('should emit buttonSliderSubmit event when message is sendable', () => {
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
    
        expect(component.buttonSliderSubmit.emit).toHaveBeenCalledWith(true);
    });
});