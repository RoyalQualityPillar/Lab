import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StbpCompletedComponent } from './stbp-completed.component';

describe('StbpCompletedComponent', () => {
  let component: StbpCompletedComponent;
  let fixture: ComponentFixture<StbpCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StbpCompletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StbpCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
