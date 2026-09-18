import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsPeraamentersRecordCreateUpdateComponent } from './ws-peraamenters-record-create-update.component';

describe('WsPeraamentersRecordCreateUpdateComponent', () => {
  let component: WsPeraamentersRecordCreateUpdateComponent;
  let fixture: ComponentFixture<WsPeraamentersRecordCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WsPeraamentersRecordCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsPeraamentersRecordCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
