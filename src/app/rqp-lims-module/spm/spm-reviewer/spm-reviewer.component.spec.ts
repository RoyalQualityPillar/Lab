import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpmReviewerComponent } from './spm-reviewer.component';

describe('SpmReviewerComponent', () => {
  let component: SpmReviewerComponent;
  let fixture: ComponentFixture<SpmReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpmReviewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpmReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
