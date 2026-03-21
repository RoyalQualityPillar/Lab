import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationSchHomePageComponent } from './calibration-sch-home-page.component';

describe('CalibrationSchHomePageComponent', () => {
  let component: CalibrationSchHomePageComponent;
  let fixture: ComponentFixture<CalibrationSchHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalibrationSchHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalibrationSchHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
