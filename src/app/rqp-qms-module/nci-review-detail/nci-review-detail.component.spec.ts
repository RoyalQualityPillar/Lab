import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NciReviewDetailComponent } from './nci-review-detail.component';

describe('NciReviewDetailComponent', () => {
  let component: NciReviewDetailComponent;
  let fixture: ComponentFixture<NciReviewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NciReviewDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NciReviewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
