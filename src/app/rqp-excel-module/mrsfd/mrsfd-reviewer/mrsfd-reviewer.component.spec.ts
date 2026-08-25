import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsfdReviewerComponent } from './mrsfd-reviewer.component';

describe('MrsfdReviewerComponent', () => {
  let component: MrsfdReviewerComponent;
  let fixture: ComponentFixture<MrsfdReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsfdReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsfdReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
