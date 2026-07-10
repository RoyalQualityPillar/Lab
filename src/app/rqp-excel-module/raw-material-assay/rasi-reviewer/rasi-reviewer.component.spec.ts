import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RasiReviewerComponent } from './rasi-reviewer.component';

describe('RasiReviewerComponent', () => {
  let component: RasiReviewerComponent;
  let fixture: ComponentFixture<RasiReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RasiReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RasiReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
