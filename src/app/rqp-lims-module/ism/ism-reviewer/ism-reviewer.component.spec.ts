import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsmReviewerComponent } from './ism-reviewer.component';

describe('IsmReviewerComponent', () => {
  let component: IsmReviewerComponent;
  let fixture: ComponentFixture<IsmReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IsmReviewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsmReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
