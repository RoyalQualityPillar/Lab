import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRegistrationReviewSaveComponent } from './test-registration-review-save.component';

describe('TestRegistrationReviewSaveComponent', () => {
  let component: TestRegistrationReviewSaveComponent;
  let fixture: ComponentFixture<TestRegistrationReviewSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestRegistrationReviewSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestRegistrationReviewSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
