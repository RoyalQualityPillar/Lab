import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRegistrationUpdateSaveComponent } from './test-registration-update-save.component';

describe('TestRegistrationUpdateSaveComponent', () => {
  let component: TestRegistrationUpdateSaveComponent;
  let fixture: ComponentFixture<TestRegistrationUpdateSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestRegistrationUpdateSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestRegistrationUpdateSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
