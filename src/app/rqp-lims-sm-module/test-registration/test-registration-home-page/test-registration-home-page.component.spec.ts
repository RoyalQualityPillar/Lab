import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRegistrationHomePageComponent } from './test-registration-home-page.component';

describe('TestRegistrationHomePageComponent', () => {
  let component: TestRegistrationHomePageComponent;
  let fixture: ComponentFixture<TestRegistrationHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestRegistrationHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestRegistrationHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
