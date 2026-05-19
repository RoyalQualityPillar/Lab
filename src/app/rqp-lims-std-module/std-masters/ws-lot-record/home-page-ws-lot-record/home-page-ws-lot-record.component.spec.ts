import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageWsLotRecordComponent } from './home-page-ws-lot-record.component';

describe('HomePageWsLotRecordComponent', () => {
  let component: HomePageWsLotRecordComponent;
  let fixture: ComponentFixture<HomePageWsLotRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageWsLotRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageWsLotRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
