import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WslrReviewerComponent } from './wslr-reviewer.component';

describe('WslrReviewerComponent', () => {
  let component: WslrReviewerComponent;
  let fixture: ComponentFixture<WslrReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WslrReviewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WslrReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
