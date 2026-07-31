import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionCompletedListComponent } from './consumption-completed-list.component';

describe('ConsumptionCompletedListComponent', () => {
  let component: ConsumptionCompletedListComponent;
  let fixture: ComponentFixture<ConsumptionCompletedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsumptionCompletedListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumptionCompletedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
