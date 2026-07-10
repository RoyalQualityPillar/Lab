import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsaReviewerComponent } from './mrsa-reviewer.component';

describe('MrsaReviewerComponent', () => {
  let component: MrsaReviewerComponent;
  let fixture: ComponentFixture<MrsaReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsaReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsaReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
