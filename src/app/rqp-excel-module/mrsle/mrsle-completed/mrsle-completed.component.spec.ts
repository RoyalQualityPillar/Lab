import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsleCompletedComponent } from './mrsle-completed.component';

describe('MrsleCompletedComponent', () => {
  let component: MrsleCompletedComponent;
  let fixture: ComponentFixture<MrsleCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsleCompletedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsleCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
