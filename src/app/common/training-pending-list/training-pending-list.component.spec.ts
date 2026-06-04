import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPendingListComponent } from './training-pending-list.component';

describe('TrainingPendingListComponent', () => {
  let component: TrainingPendingListComponent;
  let fixture: ComponentFixture<TrainingPendingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingPendingListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingPendingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
