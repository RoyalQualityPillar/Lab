import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpmReviewerSaveComponent } from './spm-reviewer-save.component';

describe('SpmReviewerSaveComponent', () => {
  let component: SpmReviewerSaveComponent;
  let fixture: ComponentFixture<SpmReviewerSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpmReviewerSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpmReviewerSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
