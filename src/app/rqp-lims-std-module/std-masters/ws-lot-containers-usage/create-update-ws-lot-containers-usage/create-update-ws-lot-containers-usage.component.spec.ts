import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateWsLotContainersUsageComponent } from './create-update-ws-lot-containers-usage.component';

describe('CreateUpdateWsLotContainersUsageComponent', () => {
  let component: CreateUpdateWsLotContainersUsageComponent;
  let fixture: ComponentFixture<CreateUpdateWsLotContainersUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUpdateWsLotContainersUsageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateWsLotContainersUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
