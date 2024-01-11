import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";

import { PopupComponent } from "./popup.component";
import { ButtonSliderComponent } from "../button-slider/button-slider.component";
import { IconComponent } from "../icon/icon.component";

describe('PopupComponent', () => {
    let component: PopupComponent;
    let fixture: ComponentFixture<PopupComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PopupComponent, ButtonSliderComponent, IconComponent]
        });
        fixture = TestBed.createComponent(PopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit close event when close button is clicked', fakeAsync(() => {
        component.showCloseButton = true;

        spyOn(component.close, 'emit'); // Spy on the close event
      
        fixture.detectChanges();
        tick();

        const closeButton = fixture.nativeElement.querySelector('.bo-popup-close-1');
        closeButton.click();

        expect(component.close.emit).toHaveBeenCalled();
    }));

    it('should emit close event when Escape key is pressed', fakeAsync(() => {
        spyOn(component.close, 'emit'); // Spy on the close event
      
        fixture.detectChanges();
        tick();

        const event = new KeyboardEvent('keyup', { key: 'Escape' });
        window.dispatchEvent(event);

        expect(component.close.emit).toHaveBeenCalled();
    }));

    it('should set showSliderAfterResponse to false when toggleButton is called', () => {
        component.showSliderAfterResponse = true;

        component.toggleButton();

        expect(component.showSliderAfterResponse).toBe(false);
    });
});