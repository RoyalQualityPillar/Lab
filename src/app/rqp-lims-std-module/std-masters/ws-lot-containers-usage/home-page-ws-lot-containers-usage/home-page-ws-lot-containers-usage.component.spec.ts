import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageWsLotContainersUsageComponent } from './home-page-ws-lot-containers-usage.component';

describe('HomePageWsLotContainersUsageComponent', () => {
  let component: HomePageWsLotContainersUsageComponent;
  let fixture: ComponentFixture<HomePageWsLotContainersUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageWsLotContainersUsageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageWsLotContainersUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
