import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageSampleTextPlanComponent } from './home-page-sample-text-plan.component';

describe('HomePageSampleTextPlanComponent', () => {
  let component: HomePageSampleTextPlanComponent;
  let fixture: ComponentFixture<HomePageSampleTextPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageSampleTextPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageSampleTextPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
