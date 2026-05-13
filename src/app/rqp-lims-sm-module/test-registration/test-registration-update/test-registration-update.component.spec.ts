import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRegistrationUpdateComponent } from './test-registration-update.component';

describe('TestRegistrationUpdateComponent', () => {
  let component: TestRegistrationUpdateComponent;
  let fixture: ComponentFixture<TestRegistrationUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestRegistrationUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestRegistrationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
