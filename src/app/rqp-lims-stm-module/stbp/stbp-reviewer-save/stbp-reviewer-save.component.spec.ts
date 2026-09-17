import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StbpReviewerSaveComponent } from './stbp-reviewer-save.component';

describe('StbpReviewerSaveComponent', () => {
  let component: StbpReviewerSaveComponent;
  let fixture: ComponentFixture<StbpReviewerSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StbpReviewerSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StbpReviewerSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
