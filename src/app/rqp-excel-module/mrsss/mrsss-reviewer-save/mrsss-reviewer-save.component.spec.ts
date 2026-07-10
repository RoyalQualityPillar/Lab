import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsssReviewerSaveComponent } from './mrsss-reviewer-save.component';

describe('MrsssReviewerSaveComponent', () => {
  let component: MrsssReviewerSaveComponent;
  let fixture: ComponentFixture<MrsssReviewerSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsssReviewerSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsssReviewerSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
