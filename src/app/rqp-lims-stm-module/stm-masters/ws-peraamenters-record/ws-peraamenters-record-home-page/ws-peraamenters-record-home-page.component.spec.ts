import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsPeraamentersRecordHomePageComponent } from './ws-peraamenters-record-home-page.component';

describe('WsPeraamentersRecordHomePageComponent', () => {
  let component: WsPeraamentersRecordHomePageComponent;
  let fixture: ComponentFixture<WsPeraamentersRecordHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WsPeraamentersRecordHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsPeraamentersRecordHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
