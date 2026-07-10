import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsleReviewerSaveComponent } from './mrsle-reviewer-save.component';

describe('MrsleReviewerSaveComponent', () => {
  let component: MrsleReviewerSaveComponent;
  let fixture: ComponentFixture<MrsleReviewerSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsleReviewerSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsleReviewerSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
