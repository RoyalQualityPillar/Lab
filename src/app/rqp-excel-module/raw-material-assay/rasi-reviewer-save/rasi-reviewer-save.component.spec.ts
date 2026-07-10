import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RasiReviewerSaveComponent } from './rasi-reviewer-save.component';

describe('RasiReviewerSaveComponent', () => {
  let component: RasiReviewerSaveComponent;
  let fixture: ComponentFixture<RasiReviewerSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RasiReviewerSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RasiReviewerSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
