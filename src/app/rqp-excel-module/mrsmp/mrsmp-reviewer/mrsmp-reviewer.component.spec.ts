import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsmpReviewerComponent } from './mrsmp-reviewer.component';

describe('MrsmpReviewerComponent', () => {
  let component: MrsmpReviewerComponent;
  let fixture: ComponentFixture<MrsmpReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsmpReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsmpReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
