import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpmReviewerComponent } from './ipm-reviewer.component';

describe('IpmReviewerComponent', () => {
  let component: IpmReviewerComponent;
  let fixture: ComponentFixture<IpmReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IpmReviewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpmReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
