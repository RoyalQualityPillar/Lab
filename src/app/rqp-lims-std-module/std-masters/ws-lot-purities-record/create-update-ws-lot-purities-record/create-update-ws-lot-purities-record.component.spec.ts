import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateWsLotPuritiesRecordComponent } from './create-update-ws-lot-purities-record.component';

describe('CreateUpdateWsLotPuritiesRecordComponent', () => {
  let component: CreateUpdateWsLotPuritiesRecordComponent;
  let fixture: ComponentFixture<CreateUpdateWsLotPuritiesRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUpdateWsLotPuritiesRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateWsLotPuritiesRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
