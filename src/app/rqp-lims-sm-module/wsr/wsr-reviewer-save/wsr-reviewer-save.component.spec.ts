import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsrReviewerSaveComponent } from './wsr-reviewer-save.component';

describe('WsrReviewerSaveComponent', () => {
  let component: WsrReviewerSaveComponent;
  let fixture: ComponentFixture<WsrReviewerSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WsrReviewerSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsrReviewerSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
