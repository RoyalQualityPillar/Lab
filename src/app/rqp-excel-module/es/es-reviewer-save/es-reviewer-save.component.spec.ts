import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsReviewerSaveComponent } from './es-reviewer-save.component';

describe('EsReviewerSaveComponent', () => {
  let component: EsReviewerSaveComponent;
  let fixture: ComponentFixture<EsReviewerSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsReviewerSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsReviewerSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
