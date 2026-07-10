import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsmpReviewerSaveComponent } from './mrsmp-reviewer-save.component';

describe('MrsmpReviewerSaveComponent', () => {
  let component: MrsmpReviewerSaveComponent;
  let fixture: ComponentFixture<MrsmpReviewerSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsmpReviewerSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsmpReviewerSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
