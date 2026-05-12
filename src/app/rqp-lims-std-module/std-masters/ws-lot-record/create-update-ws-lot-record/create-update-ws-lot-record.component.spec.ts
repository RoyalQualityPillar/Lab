import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateWsLotRecordComponent } from './create-update-ws-lot-record.component';

describe('CreateUpdateWsLotRecordComponent', () => {
  let component: CreateUpdateWsLotRecordComponent;
  let fixture: ComponentFixture<CreateUpdateWsLotRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUpdateWsLotRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateWsLotRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
