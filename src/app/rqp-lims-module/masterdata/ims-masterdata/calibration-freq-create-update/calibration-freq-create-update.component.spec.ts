import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationFreqCreateUpdateComponent } from './calibration-freq-create-update.component';

describe('CalibrationFreqCreateUpdateComponent', () => {
  let component: CalibrationFreqCreateUpdateComponent;
  let fixture: ComponentFixture<CalibrationFreqCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalibrationFreqCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalibrationFreqCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
