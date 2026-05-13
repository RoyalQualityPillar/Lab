import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRegistrationReviewComponent } from './test-registration-review.component';

describe('TestRegistrationReviewComponent', () => {
  let component: TestRegistrationReviewComponent;
  let fixture: ComponentFixture<TestRegistrationReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestRegistrationReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestRegistrationReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
