import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageInstrumentStatusComponent } from './home-page-instrument-status.component';

describe('HomePageInstrumentStatusComponent', () => {
  let component: HomePageInstrumentStatusComponent;
  let fixture: ComponentFixture<HomePageInstrumentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageInstrumentStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageInstrumentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
