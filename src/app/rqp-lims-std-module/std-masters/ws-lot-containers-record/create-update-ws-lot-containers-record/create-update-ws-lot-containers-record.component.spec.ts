import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateWsLotContainersRecordComponent } from './create-update-ws-lot-containers-record.component';

describe('CreateUpdateWsLotContainersRecordComponent', () => {
  let component: CreateUpdateWsLotContainersRecordComponent;
  let fixture: ComponentFixture<CreateUpdateWsLotContainersRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUpdateWsLotContainersRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateWsLotContainersRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
