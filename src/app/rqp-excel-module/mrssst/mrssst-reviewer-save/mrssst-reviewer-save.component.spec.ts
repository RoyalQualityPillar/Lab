import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrssstReviewerSaveComponent } from './mrssst-reviewer-save.component';

describe('MrssstReviewerSaveComponent', () => {
  let component: MrssstReviewerSaveComponent;
  let fixture: ComponentFixture<MrssstReviewerSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrssstReviewerSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrssstReviewerSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
