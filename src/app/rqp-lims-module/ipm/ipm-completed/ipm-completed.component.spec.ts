import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpmCompletedComponent } from './ipm-completed.component';

describe('IpmCompletedComponent', () => {
  let component: IpmCompletedComponent;
  let fixture: ComponentFixture<IpmCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IpmCompletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpmCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
