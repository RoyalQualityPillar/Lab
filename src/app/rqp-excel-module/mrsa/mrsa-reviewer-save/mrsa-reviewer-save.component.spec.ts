import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsaReviewerSaveComponent } from './mrsa-reviewer-save.component';

describe('MrsaReviewerSaveComponent', () => {
  let component: MrsaReviewerSaveComponent;
  let fixture: ComponentFixture<MrsaReviewerSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsaReviewerSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsaReviewerSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
