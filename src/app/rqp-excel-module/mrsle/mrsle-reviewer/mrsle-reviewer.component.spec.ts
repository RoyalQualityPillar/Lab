import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsleReviewerComponent } from './mrsle-reviewer.component';

describe('MrsleReviewerComponent', () => {
  let component: MrsleReviewerComponent;
  let fixture: ComponentFixture<MrsleReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsleReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsleReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
