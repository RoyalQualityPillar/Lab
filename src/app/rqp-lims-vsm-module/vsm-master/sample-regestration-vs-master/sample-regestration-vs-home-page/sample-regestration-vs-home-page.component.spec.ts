import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleRegestrationVsHomePageComponent } from './sample-regestration-vs-home-page.component';

describe('SampleRegestrationVsHomePageComponent', () => {
  let component: SampleRegestrationVsHomePageComponent;
  let fixture: ComponentFixture<SampleRegestrationVsHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SampleRegestrationVsHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleRegestrationVsHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
