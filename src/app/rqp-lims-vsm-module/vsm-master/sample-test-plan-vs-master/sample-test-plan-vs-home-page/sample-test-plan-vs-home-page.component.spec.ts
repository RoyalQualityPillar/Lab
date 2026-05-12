import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleTestPlanVsHomePageComponent } from './sample-test-plan-vs-home-page.component';

describe('SampleTestPlanVsHomePageComponent', () => {
  let component: SampleTestPlanVsHomePageComponent;
  let fixture: ComponentFixture<SampleTestPlanVsHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SampleTestPlanVsHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleTestPlanVsHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
