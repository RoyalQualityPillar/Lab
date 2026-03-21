import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentMasterHomePageComponent } from './instrument-master-home-page.component';

describe('InstrumentMasterHomePageComponent', () => {
  let component: InstrumentMasterHomePageComponent;
  let fixture: ComponentFixture<InstrumentMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstrumentMasterHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstrumentMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
