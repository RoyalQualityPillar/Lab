import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventiveMaintananceScheduleMasterComponent } from './preventive-maintanance-schedule-master.component';

describe('PreventiveMaintananceScheduleMasterComponent', () => {
  let component: PreventiveMaintananceScheduleMasterComponent;
  let fixture: ComponentFixture<PreventiveMaintananceScheduleMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreventiveMaintananceScheduleMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreventiveMaintananceScheduleMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
