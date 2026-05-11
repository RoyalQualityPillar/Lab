import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageWsLotPuritiesRecordComponent } from './home-page-ws-lot-purities-record.component';

describe('HomePageWsLotPuritiesRecordComponent', () => {
  let component: HomePageWsLotPuritiesRecordComponent;
  let fixture: ComponentFixture<HomePageWsLotPuritiesRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageWsLotPuritiesRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageWsLotPuritiesRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
