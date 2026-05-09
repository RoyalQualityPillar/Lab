import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleTestPlanVsCreateUpdateComponent } from './sample-test-plan-vs-create-update.component';

describe('SampleTestPlanVsCreateUpdateComponent', () => {
  let component: SampleTestPlanVsCreateUpdateComponent;
  let fixture: ComponentFixture<SampleTestPlanVsCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SampleTestPlanVsCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleTestPlanVsCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
