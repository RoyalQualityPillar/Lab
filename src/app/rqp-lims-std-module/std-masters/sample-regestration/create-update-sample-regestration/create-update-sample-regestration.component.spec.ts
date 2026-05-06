import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateSampleRegestrationComponent } from './create-update-sample-regestration.component';

describe('CreateUpdateSampleRegestrationComponent', () => {
  let component: CreateUpdateSampleRegestrationComponent;
  let fixture: ComponentFixture<CreateUpdateSampleRegestrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUpdateSampleRegestrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateSampleRegestrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
