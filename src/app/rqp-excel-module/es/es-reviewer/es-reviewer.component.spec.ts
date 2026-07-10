import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsReviewerComponent } from './es-reviewer.component';

describe('EsReviewerComponent', () => {
  let component: EsReviewerComponent;
  let fixture: ComponentFixture<EsReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
