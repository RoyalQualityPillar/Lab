import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateInstrumentStatusComponent } from './create-update-instrument-status.component';

describe('CreateUpdateInstrumentStatusComponent', () => {
  let component: CreateUpdateInstrumentStatusComponent;
  let fixture: ComponentFixture<CreateUpdateInstrumentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUpdateInstrumentStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateInstrumentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
