import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpmCompletedComponent } from './spm-completed.component';

describe('SpmCompletedComponent', () => {
  let component: SpmCompletedComponent;
  let fixture: ComponentFixture<SpmCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpmCompletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpmCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
