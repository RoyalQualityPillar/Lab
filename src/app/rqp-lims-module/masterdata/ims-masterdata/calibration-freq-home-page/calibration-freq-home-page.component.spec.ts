import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationFreqHomePageComponent } from './calibration-freq-home-page.component';

describe('CalibrationFreqHomePageComponent', () => {
  let component: CalibrationFreqHomePageComponent;
  let fixture: ComponentFixture<CalibrationFreqHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalibrationFreqHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalibrationFreqHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
