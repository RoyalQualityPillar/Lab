import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsmReviewerHomePageComponent } from './ism-reviewer-home-page.component';

describe('IsmReviewerHomePageComponent', () => {
  let component: IsmReviewerHomePageComponent;
  let fixture: ComponentFixture<IsmReviewerHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IsmReviewerHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsmReviewerHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
