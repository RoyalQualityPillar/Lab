import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageWsLotContainersRecordComponent } from './home-page-ws-lot-containers-record.component';

describe('HomePageWsLotContainersRecordComponent', () => {
  let component: HomePageWsLotContainersRecordComponent;
  let fixture: ComponentFixture<HomePageWsLotContainersRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageWsLotContainersRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageWsLotContainersRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
