import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsrReviewerComponent } from './wsr-reviewer.component';

describe('WsrReviewerComponent', () => {
  let component: WsrReviewerComponent;
  let fixture: ComponentFixture<WsrReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WsrReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsrReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
