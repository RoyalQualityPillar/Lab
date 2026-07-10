import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsssReviewerComponent } from './mrsss-reviewer.component';

describe('MrsssReviewerComponent', () => {
  let component: MrsssReviewerComponent;
  let fixture: ComponentFixture<MrsssReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsssReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsssReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
