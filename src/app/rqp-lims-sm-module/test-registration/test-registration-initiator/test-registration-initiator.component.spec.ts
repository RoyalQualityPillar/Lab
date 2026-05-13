import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRegistrationInitiatorComponent } from './test-registration-initiator.component';

describe('TestRegistrationInitiatorComponent', () => {
  let component: TestRegistrationInitiatorComponent;
  let fixture: ComponentFixture<TestRegistrationInitiatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestRegistrationInitiatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestRegistrationInitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
