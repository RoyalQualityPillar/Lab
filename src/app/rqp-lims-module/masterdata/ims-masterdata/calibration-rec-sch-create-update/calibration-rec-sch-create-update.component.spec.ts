import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationRecSchCreateUpdateComponent } from './calibration-rec-sch-create-update.component';

describe('CalibrationRecSchCreateUpdateComponent', () => {
  let component: CalibrationRecSchCreateUpdateComponent;
  let fixture: ComponentFixture<CalibrationRecSchCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalibrationRecSchCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalibrationRecSchCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
