import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationRecSchHomePageComponent } from './calibration-rec-sch-home-page.component';

describe('CalibrationRecSchHomePageComponent', () => {
  let component: CalibrationRecSchHomePageComponent;
  let fixture: ComponentFixture<CalibrationRecSchHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalibrationRecSchHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalibrationRecSchHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
