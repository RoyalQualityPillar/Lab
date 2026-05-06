import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageSampleRegestrationComponent } from './home-page-sample-regestration.component';

describe('HomePageSampleRegestrationComponent', () => {
  let component: HomePageSampleRegestrationComponent;
  let fixture: ComponentFixture<HomePageSampleRegestrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageSampleRegestrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageSampleRegestrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
