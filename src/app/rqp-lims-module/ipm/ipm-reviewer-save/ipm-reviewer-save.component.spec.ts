import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpmReviewerSaveComponent } from './ipm-reviewer-save.component';

describe('IpmReviewerSaveComponent', () => {
  let component: IpmReviewerSaveComponent;
  let fixture: ComponentFixture<IpmReviewerSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IpmReviewerSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpmReviewerSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
