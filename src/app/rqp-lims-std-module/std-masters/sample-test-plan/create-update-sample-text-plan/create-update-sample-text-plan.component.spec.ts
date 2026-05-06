import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateSampleTextPlanComponent } from './create-update-sample-text-plan.component';

describe('CreateUpdateSampleTextPlanComponent', () => {
  let component: CreateUpdateSampleTextPlanComponent;
  let fixture: ComponentFixture<CreateUpdateSampleTextPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUpdateSampleTextPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateSampleTextPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
