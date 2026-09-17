import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StbpReviewerComponent } from './stbp-reviewer.component';

describe('StbpReviewerComponent', () => {
  let component: StbpReviewerComponent;
  let fixture: ComponentFixture<StbpReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StbpReviewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StbpReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
