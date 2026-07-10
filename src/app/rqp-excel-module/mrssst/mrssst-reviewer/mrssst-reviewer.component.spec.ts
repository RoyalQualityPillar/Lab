import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrssstReviewerComponent } from './mrssst-reviewer.component';

describe('MrssstReviewerComponent', () => {
  let component: MrssstReviewerComponent;
  let fixture: ComponentFixture<MrssstReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrssstReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrssstReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
