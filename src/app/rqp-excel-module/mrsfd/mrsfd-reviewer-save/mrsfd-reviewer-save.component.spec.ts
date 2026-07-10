import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsfdReviewerSaveComponent } from './mrsfd-reviewer-save.component';

describe('MrsfdReviewerSaveComponent', () => {
  let component: MrsfdReviewerSaveComponent;
  let fixture: ComponentFixture<MrsfdReviewerSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsfdReviewerSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsfdReviewerSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
