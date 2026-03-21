import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentMasterCreateUpdateComponent } from './instrument-master-create-update.component';

describe('InstrumentMasterCreateUpdateComponent', () => {
  let component: InstrumentMasterCreateUpdateComponent;
  let fixture: ComponentFixture<InstrumentMasterCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstrumentMasterCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstrumentMasterCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
