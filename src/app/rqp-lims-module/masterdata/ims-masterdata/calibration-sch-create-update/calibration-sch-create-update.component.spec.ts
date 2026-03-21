import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationSchCreateUpdateComponent } from './calibration-sch-create-update.component';

describe('CalibrationSchCreateUpdateComponent', () => {
  let component: CalibrationSchCreateUpdateComponent;
  let fixture: ComponentFixture<CalibrationSchCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalibrationSchCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalibrationSchCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
