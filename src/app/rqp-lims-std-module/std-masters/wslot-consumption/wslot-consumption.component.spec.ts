import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WslotConsumptionComponent } from './wslot-consumption.component';

describe('WslotConsumptionComponent', () => {
  let component: WslotConsumptionComponent;
  let fixture: ComponentFixture<WslotConsumptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WslotConsumptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WslotConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
