import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WslrReviewerSaveComponent } from './wslr-reviewer-save.component';

describe('WslrReviewerSaveComponent', () => {
  let component: WslrReviewerSaveComponent;
  let fixture: ComponentFixture<WslrReviewerSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WslrReviewerSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WslrReviewerSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
